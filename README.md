# Hyper Sketch 2000

**Hyper Sketch 2000** is a quick prototype of a web application that allows the user to search for pictures posted on Flick, edit them and store them in a MongoDB database. It was build using [jQuery] for DOM manipulation and [p5.js] for the picture editor.

* [Try the app now]

How to Use
------

By clicking the **Search Flickr** button, the user can look for pictures posted on Flickr that match a particular search term

When looking at the search results, the user can click the **Open in Editor** button to access the editor view of that particular picture

<h3 align="center">
  <img src="https://dl.dropboxusercontent.com/s/ixqreltn3sfpe98/hyper_01.png?dl=0" alt="hyper sketch 2000 screenshot" />
</h3>

In the editor view, many options become available. It is possible to edit the title and author of the picture and draw over it using the pencil. Clicking on a different color will change the color of the pencil.

By clicking the **Save** button, the user can save the current modified version of the picture in the database. An alert will appear letting the user know if the image has been correctly saved.

<h3 align="center">
  <img src="https://dl.dropboxusercontent.com/s/vp1p9ubmate9fs5/hyper_04.png?dl=0" alt="hyper sketch 2000 screenshot" />
</h3>

By clicking the **Search Flickr** button, the user can look through all the pictures stored in the database. It is possible from this view to delete individual images or open them in the editor.

<h3 align="center">
  <img src="https://dl.dropboxusercontent.com/s/glfwtyui5z48d7m/hyper_02.png?dl=0" alt="hyper sketch 2000 screenshot" />
</h3>

Finally, **Free Draw Mode** provides the user with an empty Canvas for quick drawing.

<h3 align="center">
  <img src="https://dl.dropboxusercontent.com/s/kafx4d5yh0l490k/hyper_03.png?dl=0" alt="hyper sketch 2000 screenshot" />
</h3>

<!---
Link References
-->

[jQuery]:https://jquery.com/
[p5.js]:https://p5js.org/
[Try the app now]:http://hyper-sketch-2000.herokuapp.com/
