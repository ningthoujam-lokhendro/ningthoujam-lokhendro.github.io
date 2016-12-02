---
layout: post
title: "Spring Redis Sentinel Connection"
description: ""
category: "Java"
tags:
-  spring
-  redis
excerpt: Redis Sentinel connection configuration in Spring
---
* TOC:
{:toc}

##	Redis Client
There are good [java clients][] available for the Redis. __Jedis__ is used here for the discussion.
If maven is used for the build tool management, check out the list of [jedis release version][].

Include in your POM file:
{% highlight xml %}
<!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>${jedis.version}</version>
</dependency>

{% endhighlight %}

##	Sentinel Deployment Example
Sentinel provide <kbd>high availabity</kbd> for Redis. Certain extends of failure condition is handle by Sentinel without human interaction.

These are basic capabilities of the sentinel:
* <kbd>Monitoring</kbd> - Sentinel constantly checks if your master and slave instances are working as expected.
* <kbd>Notification</kbd> - Sentinel can notify the system administrator, another computer programs, via an API, that something is wrong with one of the monitored Redis instances.
* <kbd>Automatic failover</kbd> - If a master is not working as expected, Sentinel can start a failover process where a slave is promoted to master, the other additional slaves are reconfigured to use the new master, and the applications using the Redis server informed about the new address to use when connecting.
* <kbd>Configuration provider</kbd> - Sentinel acts as a source of authority for clients service discovery: clients connect to Sentinels in order to ask for the address of the current Redis master responsible for a given service. If a failover occurs, Sentinels will report the new address.

Check out the [Redis Sentinel Nodes][] for the example deployment.

##	Spring Configuration
The following is using java configuration. XML configuration should be pretty to convert from this.

Lets assume that the sentinel properties are defined in `application.properties` in the classpath.
{% highlight properties %}
# Pool Configuration
redis.pool.max-active = 128
redis.pool.max-idle = 20
# Define the sentinels nodes
redis.sentinel.node.1.host = redis.node1
redis.sentinel.node.1.port = 26381
redis.sentinel.node.2.host = redis.node2
redis.sentinel.node.2.port = 26382
redis.sentinel.node.3.host = redis.node3
redis.sentinel.node.3.port = 26383
{% endhighlight %}


> Use yaml structure for defining n nodes. This is make it easier for the real deployment to add new nodes and change the java configuration to loop each nodes.
{: .quote-card .green-card }
{% highlight yaml %}
redis:
	sentinels:
		node1:
			host:	redis.node1
			port:	26381
		node2:
			host:	redis.node2
			port:	26382
		node3:
			host:	redis.node3
			port:	26383

{% endhighlight %}

### Sentinels Config
Get the properties values from the application.properties and constuct the `RedisSentinelConfiguration`.
{% highlight java %}

// Construct the RedisSentinelNodes by getting the properties.
RedisSentinelNodes sentinelNodes() {
	List<RedisSentinelNode> nodes = new ArrayList<RedisSentinelNode>();

	for (int i=1; i<=3;i++) {
		String hostProp = "redis.sentinel.node."+i+".host";
		String portProp = "redis.sentinel.node."+i+".port";

		RedisSentinelNode redisSentinelNode = new RedisSentinelNode(
				env.getProperty(hostProp),
				env.getProperty(portProp, Integer.class));

		nodes.add(redisSentinelNode);
	}

	RedisSentinelNodes redisSentinelNodes = new RedisSentinelNodes(nodes);
	return redisSentinelNodes;
}

// Construct the RedisSentinelConfiguration using all the nodes in RedisSentinelNodes
RedisSentinelConfiguration sentinelConfiguration () {
	RedisSentinelConfiguration sentinelConfig = new RedisSentinelConfiguration()
			.master("redis-cluster");

	List<RedisSentinelNode> nodes = sentinelNodes().getRedisSentinelNodes();
	for (RedisSentinelNode sn : nodes ) {
		sentinelConfig.sentinel(sn.getHost(),sn.getPort());
	}

	return sentinelConfig;
}
{% endhighlight %}

### Jedis Connection Bean
{% highlight java %}
@Bean
RedisConnectionFactory jedisConnectionFactory() {

	JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory(sentinelConfiguration());

	JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
	jedisConnectionFactory.setUsePool(true);
	jedisPoolConfig.setMaxTotal(env.getRequiredProperty("redis.pool.max-active", Integer.class));
	jedisPoolConfig.setMaxIdle(env.getRequiredProperty("redis.pool.max-idle", Integer.class));
	jedisConnectionFactory.setPoolConfig(jedisPoolConfig);
	return jedisConnectionFactory;
}
{% endhighlight %}

### Redis Template Bean
{% highlight java %}
@Bean
public RedisTemplate<?, ?> redisTemplate() {
	RedisTemplate<?, ?> redisTemplate = new RedisTemplate<>();
	redisTemplate.setConnectionFactory(jedisConnectionFactory());
	redisTemplate.setDefaultSerializer(stringRedisSerializer());
	redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer());
	return redisTemplate;
}
{% endhighlight %}

> Reference : [Redis Sentinel Documentation][]

[java clients]:	https://redis.io/clients#java
[jedis release version]:	https://mvnrepository.com/artifact/redis.clients/jedis
[Redis Sentinel Nodes]:	https://github.com/ningthoujam-lokhendro/RedisSentinelNodes
[Redis Sentinel Documentation]: https://redis.io/topics/sentinel