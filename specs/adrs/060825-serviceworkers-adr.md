# Serviceworkers Evaluation

## Status:

Accepted

## Purpose:

- Our application is incredibly image heavy, there are 72 images of tarot cards we need to load, as well as the background image, and the various logos. Although we have applied minification to all of our files, as well as swapping image formats, scaling down, etc., there are still a large quantity of images to load.
- A large quantity of our userbase are likely to be mobile users as well, as your horoscope/tarot card reading is something you may check when you're bored, when you're around other people and want something to talk about (especially for texting purposes), and when you're checking your phone in the morning.

## Solution:

- Mobile users on unstable/weak internet connections will struggle with the large amount of images present in our project.
- Service workers can cache our images and make it so, even on a weak connection, load times are fast and the website is responsive.
