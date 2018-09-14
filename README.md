###### Learning Project
# Notedown &nbsp; [![Build Status](https://travis-ci.com/sambokai/Notedown.svg?token=B3c5dqi77zsc6HReanrw&branch=master)](https://travis-ci.com/sambokai/Notedown) [![codecov](https://codecov.io/gh/sambokai/Notedown/branch/master/graph/badge.svg?token=Ak3YxHVPFs)](https://codecov.io/gh/sambokai/Notedown)

[Live Demo](https://notedown.sambokai.com)

## Thoughts

#### Why Drag & Drop?
The drag and drop capability of the note list is not necessary, from a **UX** point of view. It's implementation was merely a first attempt at familiarizing myself with the integration of third-party react components. The drag and drop sorting would make more sense, if there was a folder hierarchy. But in the current scope of the app, an automatic sorting by _most recently modified_, possibly with the addition of pinning notes that are explicitly supposed to stay on top, would have been the better UX/UI design decision.


#### Why not Redux?
I have decided against using an external state management solution to become more comfortable with React itself. 
At some point I noticed that I was spending too much time figuring out Redux for very small learning projects, that [don't benefit from extended state management anyway](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367).  

> If you chase two rabbits, you will catch neither one. - Russian proverb

While I clearly see the benefit of using Redux or Mobx, I'd like to stick to one rabbit for this project. I will migrate this to Redux after having finished it. The comparison will probably be very insightful.
