---
layout: post
title:  "JAXB Tutorial"
date:   2014-04-27 22:22:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tags: ['jaxb']
---
* TOC:
{:toc}

JAXB stands for <kbd>Java Architecture for XML Binding</kbd>. JAXB is used in converting XML to Java Object and vice verse which means:

* Marshalling : Convert Java Object → XML
* UnMarshalling : Convert XML → Java Object

As XML is used as an easy means to transport data in Internet, JAXB helps in seamless usage of the data.

## Pre-Requestic
JAXB is bundle with JDK 1.6 and later. But if you are using pre JDK 1.6 version,  the jar file need to be added at the classpath.

Assuming maven is used, add this dependency:
{% highlight xml %}
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.1</version>
</dependency>
{% endhighlight %}

## Core Usage
The usage of this feature can be seen from top as:

1. Annotate the Java Object: Details list of annotation
2. call marshall() and unmarshall() method.

## JAXB Usage for  movie description.
First we need to create a Java Object and annotate them with JAXB annotation specification.
{% highlight java %}
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(namespace="http://www.ningzeta.com/1.0")
class Movie {

    String imdbID;
    String imdbUrl;
    String title;
    Details details;

    public String getImdbID() {
        return imdbID;
    }

    @XmlElement(name="imdbid")
    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    public String getImdbUrl() {
        return imdbUrl;
    }

    @XmlElement(name="imdburl")
    public void setImdbUrl(String imdbUrl) {
        this.imdbUrl = imdbUrl;
    }

    public String getTitle() {
        return title;
    }

    @XmlElement(name="title")
    public void setTitle(String title) {
        this.title = title;
    }

    public Details getDetails() {
        return details;
    }

    @XmlElement
    public void setDetails(Details details) {
        this.details = details;
    }
}

@XmlRootElement
class Details{
    String language;
    String genre;
    String year;

    public String getLanguage() {
        return language;
    }

    @XmlElement
    public void setLanguage(String language) {
        this.language = language;
    }

    public String getGenre() {
        return genre;
    }

    @XmlElement(name="genres")
    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getYear() {
        return year;
    }

    @XmlElement
    public void setYear(String year) {
        this.year = year;
    }
}
{% endhighlight %}

## Now to Marshall the Java Object to the XML.
{% highlight java %}
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

public class Example {

    public static void main(String[] args) {

        Movie movie = new Movie();
        movie.setTitle("Unforgiven");
        movie.setImdbUrl("http://www.imdb.com/title/tt3358060/");
        movie.setImdbID("tt3358060");

        Details details = new Details();
        details.setGenre("Action,Drama,History,War");
        details.setLanguage("English");
        details.setYear("1992");
        movie.setDetails(details);

        try{
            JAXBContext jaxbContext = JAXBContext.newInstance(Movie.class);
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            StringWriter xmlWriter = new StringWriter();
            jaxbMarshaller.marshal(movie, xmlWriter);

            System.out.println(xmlWriter.getBuffer().toString());

        }
        catch(JAXBException ex){
            ex.printStackTrace();
        }
    }

}
{% endhighlight %}

## Now to UnMarshall, XML to Object
{% highlight Python %}
import java.io.File;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class Example {

    public static void main(String[] args) {

        try{
            File xmlWriter = new File("movie.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(Movie.class);
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            System.out.println("===================================================");
            System.out.println("Converting XML to Object");
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            Movie movieUnmarshall = (Movie) jaxbUnmarshaller.unmarshal(xmlWriter);
            System.out.println(movieUnmarshall);

        }
        catch(JAXBException ex){
            ex.printStackTrace();
        }
    }

}
{% endhighlight %}

[Download the whole code.][Download the whole code.]

## References
[Oracle JAXB][Oracle JAXB]

[Oracle JAXB Annotation details]

[JAXB Project]

[Download the whole code.]: https://github.com/ningthoujam-lokhendro/dump/tree/master/java/tutorial/Jaxbtutorial
[Oracle JAXB]: http://www.oracle.com/technetwork/articles/javase/index-140168.html
[Oracle JAXB Annotation details]: http://docs.oracle.com/javaee/7/api/javax/xml/bind/annotation/package-summary.html
[JAXB Project]: http://docs.oracle.com/javaee/7/api/javax/xml/bind/annotation/package-summary.html
