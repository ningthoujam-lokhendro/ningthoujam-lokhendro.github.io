# ningthoujam-lokhendro.github.io
[![Build Status](https://travis-ci.org/ningthoujam-lokhendro/ningthoujam-lokhendro.github.io.svg?branch=master)](https://travis-ci.org/ningthoujam-lokhendro/ningthoujam-lokhendro.github.io)

# Install Jekyll on MacOS

> Refer https://jekyllrb.com/docs/installation/macos/

## Install Ruby

```bash
# Install bundler
gem install bundler

# Install dep
bundle install

# export in .zshrc
export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"
export PATH="$PATH:$GEM_HOME/bin"

# Install jekyll
gem install --user-install bundler jekyll

# Install ffi
brew install libffi
gem uninstall ffi
gem install ffi -- --enable-system-libffi

# Issue with ruby 3.0 
# https://github.com/jekyll/jekyll/issues/8523
bundle add webrick

bundle exec jekyll serve

```

## Using the rake

```bash
# Create a page
rake page name="PageName.html"

# Create a Blog post
rake post title="A Title" [date="YYYY-MM-DD"] [tags="tag1,tag2"] [category="category"]

```