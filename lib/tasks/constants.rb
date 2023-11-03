# frozen_string_literal: true

# rubocop:disable Layout/LineLength

module Constants

  CATEGORIES = [
  {
    id: "b02aa59e-228a-4a18-8322-f5335b8b15b4",
    name: "Philosophy",
    position: 2
  },
  {
    id: "f84d6198-77ea-4d17-9ee7-84b2f9fc1028",
    name: "React",
    position: 3
  },
  {
    id: "e7688066-117f-4439-bab1-b5434d0836cd",
    name: "Ruby",
    position: 4
  },
  {
    id: "6ceed3d8-014a-443f-af6d-5ffa171ccf13",
    name: "New category",
    position: 6
  },
  {
    id: "6ceed3d8-014a-443f-af6d-5ffa171ccf12",
    name: "Frontend",
    position: 1
  },

  {
    id: "16ff422d-0b14-4ed4-874c-cf81bf08eb31",
    name: "Getting started",
    position: 5
  }
]


  ARTICLES = [
{
  title: "Ruby Gems: Extending Functionality with Libraries",
  author: "Oliver",
  body: "<h1><strong>Ruby Gems: Extending Functionality with Libraries</strong></h1><p></p><ol><li><p>Ruby Gems are libraries that extend Ruby's functionality. This article explores how to use and create Ruby Gems, demonstrating how to install and integrate them into your Ruby projects.</p></li><li><p></p></li></ol><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "e7688066-117f-4439-bab1-b5434d0836cd"
},

{
  title: "Mastering CSS Grid Layout",
  author: "Oliver",
  body: "<h1><strong><span style=\"color: #b33b3b\">Mastering CSS Grid Layout</span></strong></h1><p></p><ul><li><p>CSS Grid Layout is a powerful tool for creating complex web layouts.</p></li><li><p>It allows you to define grid <u>containers</u> and grid <u>items</u>.</p></li><li><p>You can create responsive designs with ease using CSS Grid.</p></li><li><p>It's excellent for creating multi-column layouts, grids of images, and more.</p></li><li><p>Mastering CSS Grid is a key skill for front-end web developers.</p></li></ul>",
  status: "Draft",
  last_published_at: nil,
  category_id: "f84d6198-77ea-4d17-9ee7-84b2f9fc1028"
},

{
  title: "JavaScript Frameworks: React vs. Vue",
  author: "Oliver",
  body: "<h1><strong>JavaScript Frameworks: React vs. Vue</strong></h1><p></p><p>JavaScript frameworks are essential for building interactive web applications. This article compares two popular front-end JavaScript frameworks, React and Vue. We'll discuss their features, strengths, and weaknesses, helping you decide which one might be the right choice for your next project. Whether you prefer the component-based architecture of React or the simplicity of Vue, this article will provide valuable insights.</p><p></p><p></p><p></p><p><span style=\"color: #b6b6b6\">Please note that the content provided here is brief and serves as an introduction to each topic. In actual articles, you would expand on these topics with more detailed explanations, examples, and possibly code snippets to provide a comprehensive understanding of each subject.</span></p>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 19:43:16.902764000 UTC +00:00",
  category_id: "f84d6198-77ea-4d17-9ee7-84b2f9fc1028"
},
{
  title: "State Management in React: A Comprehensive Guide",
  author: "Oliver",
  body: "<h3><strong>State Management in React: A Comprehensive Guide</strong></h3><p></p><p>This article explores the various state management techniques and libraries available in React. It covers the use of React's built-in state management, as well as stateful and stateless components. Additionally, it delves into popular state management libraries such as Redux and Mobx, providing examples and guidance on when to use each approach.</p><pre><code class=\"language-javascript\">// Example of managing state in a functional component using React's useState hook\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    &lt;div&gt;\n      &lt;p&gt;Count: {count}&lt;/p&gt;\n      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Increment&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}\n\n// Example of using Redux to manage application state\n// (Note: Redux setup and configuration are not shown here)\nimport { connect } from 'react-redux';\n\nfunction TodoList({ todos }) {\n  return (\n    &lt;ul&gt;\n      {todos.map((todo, index) =&gt; (\n        &lt;li key={index}&gt;{todo.text}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}\n\nconst mapStateToProps = (state) =&gt; ({\n  todos: state.todos,\n});\n\nexport default connect(mapStateToProps)(TodoList);\n</code></pre>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 19:45:14.526400000 UTC +00:00",
  category_id: "f84d6198-77ea-4d17-9ee7-84b2f9fc1028"
}, {
  title: "Use-case of generative AI",
  author: "Oliver",
  body: "<h1><span style=\"color: rgb(140, 39, 39)\">Use-case of generative AI</span>.</h1><p></p><p>Important times require peaceful thought process.</p>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 20:00:52.023058000 UTC +00:00",
  category_id: "b02aa59e-228a-4a18-8322-f5335b8b15b4"
},
{
  title: "Error Handling in Ruby: Dealing with Exceptions",
  author: "Oliver",
  body: "<h1><strong>Error Handling in Ruby: Dealing with Exceptions</strong></h1><p></p><p></p><ol><li><p><code>Error handling is a crucial aspect of programming. This article covers exception handling in Ruby, explaining how to use begin and rescue blocks to handle errors gracefully.</code></p></li></ol><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "e7688066-117f-4439-bab1-b5434d0836cd"
},
{
  title: "Object-Oriented Programming in Ruby: Classes and Inheritance",
  author: "Oliver",
  body: "<h1><strong>Object-Oriented Programming in Ruby: Classes and Inheritance</strong></h1><p></p><ol><li><p>This article delves into object-oriented programming (OOP) in Ruby. It explains how to define classes, create objects, and implement inheritance and polymorphism in Ruby.</p></li><li><p></p></li></ol><p><br></p>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 20:08:42.300475000 UTC +00:00",
  category_id: "e7688066-117f-4439-bab1-b5434d0836cd"
},
{
  title: "Sweet.",
  author: "Oliver",
  body: "<h1><span style=\"color: rgb(73, 84, 92)\">Sweet.</span></h1><p><span style=\"color: rgb(104, 115, 125)\">Add description here.</span></p><p></p><p><span style=\"color: rgb(104, 115, 125)\">Its so sweet</span></p>",
  status: "Published",
  last_published_at: "Thu, 26 Oct 2023 03:19:20.498432000 UTC +00:00",
  category_id: "16ff422d-0b14-4ed4-874c-cf81bf08eb31"
},
{
  title: "Server-Side Rendering (SSR) in React: Benefits and Implementation",
  author: "Oliver",
  body: "<h2><strong>Server-Side Rendering (SSR) in React: Benefits and Implementation</strong></h2><p></p><blockquote><p><em>Server-Side Rendering (SSR) is a critical technique for improving the performance and SEO-friendliness of React applications. This article discusses the advantages of SSR and provides a step-by-step guide on how to implement it in a React project. It covers the setup, rendering process, and common challenges you may encounter when working with SSR in React.</em></p></blockquote><pre><code class=\"language-plaintext\">// Example of a basic server-side rendering setup using React and Node.js\n// (Note: This is a simplified example for illustration purposes)\nimport React from 'react';\nimport { renderToString } from 'react-dom/server';\nimport express from 'express';\n\nconst app = express();\n\napp.get('/', (req, res) =&gt; {\n  const appContent = renderToString(&lt;App /&gt;);\n  res.send(`\n    &lt;!DOCTYPE html&gt;\n    &lt;html&gt;\n    &lt;head&gt;\n      &lt;title&gt;Server-Side Rendering Example&lt;/title&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n      &lt;div id=\"root\"&gt;${appContent}&lt;/div&gt;\n    &lt;/body&gt;\n    &lt;/html&gt;\n  `);\n});\n\napp.listen(3000, () =&gt; {\n  console.log('Server is running on port 3000');\n});\n</code></pre>",
  status: "Draft",
  last_published_at: "Fri, 27 Oct 2023 19:46:51.579804000 UTC +00:00",
  category_id: "f84d6198-77ea-4d17-9ee7-84b2f9fc1028"
},
{
  title: "Optimizing Web Performance for Faster Loading Times",
  author: "Oliver",
  body: "<p><strong>Optimizing Web Performance for Faster Loading Times</strong></p><p></p><p>This article discusses techniques for optimizing web performance to reduce loading times. It covers topics such as </p><ul><li><p>image optimization,</p></li><li><p><em><span style=\"color: #a31b1b\"><u> lazy loading</u></span></em}, </p></li><li><p>and code splitting.</p></li></ul>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 19:52:15.024786000 UTC +00:00",
  category_id: "6ceed3d8-014a-443f-af6d-5ffa171ccf12"
}, {
  title: "Web Accessibility: Designing for All Users",
  author: "Oliver",
  body: "<h1><strong>Web Accessibility: Designing for All Users</strong></h1><p></p><p><code>This article focuses on the importance of web accessibility and how to design websites that are inclusive to all users, including those with disabilities. It covers best practices, ARIA roles, and tools for testing accessibility.</code></p><p></p><p></p><pre><code class=\"language-plaintext\">&lt;!-- Example of providing alternative text for images --&gt;\n&lt;img src=\"example.jpg\" alt=\"A descriptive text for the image\"&gt;\n\n&lt;!-- Example of using semantic HTML for navigation --&gt;\n&lt;nav&gt;\n  &lt;ul&gt;\n    &lt;li&gt;&lt;a href=\"home.html\"&gt;Home&lt;/a&gt;&lt;/li&gt;\n    &lt;li&gt;&lt;a href=\"about.html\"&gt;About&lt;/a&gt;&lt;/li&gt;\n    &lt;li&gt;&lt;a href=\"contact.html\"&gt;Contact&lt;/a&gt;&lt;/li&gt;\n  &lt;/ul&gt;\n&lt;/nav&gt;\n</code></pre>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 19:50:02.100753000 UTC +00:00",
  category_id: "6ceed3d8-014a-443f-af6d-5ffa171ccf12"
},
{
  title: "CSS Transitions and Animations: Adding Interactivity to Your Website",
  author: "Oliver",
  body: "<p><strong>CSS Transitions and Animations: Adding Interactivity to Your Website</strong></p><p></p><pre><code class=\"language-css\">/* Example of a CSS transition for a button */\n.button {\n  background-color: #3498db;\n  color: #fff;\n  transition: background-color 0.3s ease;\n}\n\n.button:hover {\n  background-color: #2980b9;\n}\n\n/* Example of a CSS keyframe animation for a loading spinner */\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.spinner {\n  animation: spin 2s linear infinite;\n}\n</code></pre>",
  status: "Draft",
  last_published_at: nil,
  category_id: "6ceed3d8-014a-443f-af6d-5ffa171ccf12"
},
{
  title: "Introduction to Responsive Web Design",
  author: "Oliver",
  body: "<p><strong>Introduction to Responsive Web Design</strong></p><p></p><p></p><ul><li><p>This article provides an introduction to responsive web design principles. It covers media queries, flexible layouts, and fluid images for creating web pages that adapt to various screen sizes.</p><p><span data-type=\"mention\" data-id=\"eve-smith\" data-label=\"Eve Smith\">@Eve Smith</span> </p></li></ul>",
  status: "Draft",
  last_published_at: nil,
  category_id: "6ceed3d8-014a-443f-af6d-5ffa171ccf12"
},
{
  title: "Exploring the Modern JavaScript Ecosystem",
  author: "Oliver",
  body: "<p><strong>Exploring the Modern JavaScript Ecosystem</strong></p><p></p><p>This article delves into the modern JavaScript ecosystem, including ES6 features, package management with npm, and the use of popular libraries and frameworks like React and Vue.</p><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "6ceed3d8-014a-443f-af6d-5ffa171ccf12"
},
{
  title: "Existentialism: Embracing Freedom and Responsibility",
  author: "Oliver",
  body: "<p><strong>Existentialism: Embracing Freedom and Responsibility</strong></p><p></p><p>This article explores existentialism, a philosophical movement that emphasizes individual freedom, choice, and responsibility. It delves into the works of existentialist thinkers such as <em><u>Jean-Paul Sartre and Albert Camus</u></em}, discussing their ideas on the human condition.</p><p></p><p></p><p></p><p><strong>Additional Content:</strong> Existentialism posits that individuals are free to make their own choices and must bear the responsibility for those choices. Existentialist thinkers often confront questions about the meaning of life, the absurdity of existence, and the importance of living authentically. Jean-Paul Sartre's concept of \"existential angst\" and Albert Camus' \"absurd hero\" are notable themes within this philosophical framework.</p><p></p><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "b02aa59e-228a-4a18-8322-f5335b8b15b4"
},
{
  title: "Metaphysics: Exploring the Nature of Reality",
  author: "Oliver",
  body: "<h2><strong>Metaphysics: Exploring the Nature of Reality</strong></h2><p></p><p>This article delves into metaphysics, a branch of philosophy concerned with the nature of reality, existence, and the fundamental questions about the universe. It covers topics like the nature of being, the mind-body problem, and the concept of causality.</p><p><strong>Additional Content:</strong> Metaphysics addresses fundamental questions such as the nature of reality, the existence of abstract concepts, and the relationship between mind and matter. Philosophers like René Descartes, Immanuel Kant, and Aristotle have made significant contributions to the field. The mind-body problem, which questions the relationship between consciousness and the physical world, is a prominent issue in metaphysical discussions.</p>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 19:56:28.757607000 UTC +00:00",
  category_id: "b02aa59e-228a-4a18-8322-f5335b8b15b4"
},
{
  title: "The Fundamentals of HTML5",
  author: "Oliver",
  body: "<h2><strong>The Fundamentals of HTML5</strong></h2><ol><li><p><span style=\"background-color: rgb(247, 247, 248); color: rgb(55, 65, 81)\">HTML5 is the latest version of </span><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.google.com/search?q=HTML&amp;rlz=1C5CHFA_enIN1066IN1066&amp;oq=HTML&amp;gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDINCAEQABiDARixAxiABDINCAIQABiDARixAxiABDIGCAMQRRg7MgoIBBAAGLEDGIAEMgYIBRBFGEEyBggGEEUYQTIGCAcQRRhB0gEINDM1NGowajeoAgCwAgA&amp;sourceid=chrome&amp;ie=UTF-8\"><span style=\"color: rgb(55, 65, 81)\">Hypertext Markup Language</span></a><span style=\"background-color: rgb(247, 247, 248); color: rgb(55, 65, 81)\"}, and it serves as the backbone of web content.</span></p></li><li><p><span style=\"background-color: rgb(247, 247, 248); color: rgb(55, 65, 81)\"> In this article, we will explore the fundamental features of HTML5, including its improved semantic elements, multimedia support, and the structure it provides for building modern web pages.</span></p></li><li><p><span style=\"background-color: rgb(247, 247, 248); color: rgb(55, 65, 81)\"> Understanding the basics of HTML5 is crucial for any front-end developer.</span></p></li></ol><p></p><p></p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"google.com\">Link to google search.</a></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "f84d6198-77ea-4d17-9ee7-84b2f9fc1028"
},
{
  title: "The Philosophy of Epistemology: Understanding Knowledge",
  author: "Oliver",
  body: "<p><strong>The Philosophy of Epistemology: Understanding Knowledge</strong></p><p></p><p>This article explores epistemology, the branch of philosophy that deals with the nature of knowledge, belief, and justification. It discusses topics like skepticism, empirical knowledge, and the different ways humans acquire knowledge.</p><ol><li><p><strong>Additional Content:</strong> Epistemology seeks to answer questions related to knowledge, such as how we come to know things, what counts as a justified belief, and the nature of truth. Philosophers like Plato, Descartes, and Hume have grappled with these questions. The problem of skepticism, which challenges the reliability of knowledge, is a central concern in epistemological debates.</p></li></ol><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "b02aa59e-228a-4a18-8322-f5335b8b15b4"
},
{
  title: "The Philosophy of Ethics: Utilitarianism and the Greatest Good",
  author: "Oliver",
  body: "<p><strong>The Philosophy of Ethics: Utilitarianism and the Greatest Good</strong></p><p></p><p>This article explores the ethical theory of utilitarianism, which is a consequentialist approach to ethics. It delves into the concept of the \"greatest good for the greatest number\" and discusses the principles and criticisms of utilitarianism.</p><p><strong>Additional Content:</strong> Utilitarianism, often associated with philosophers like Jeremy Bentham and John Stuart Mill, posits that the morality of an action is determined by its consequences. The central idea is to maximize overall happiness or well-being for the greatest number of people. <span style=\"background-color: #ACCEF7; color: #ab2a2a\">Critics argue that utilitarianism may sometimes</span> lead to morally questionable decisions, as it prioritizes outcomes over individual rights and justice. This article examines the nuances of utilitarianism and the ongoing philosophical debates surrounding its application in ethics.</p><p><br></p>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 19:59:50.216869000 UTC +00:00",
  category_id: "b02aa59e-228a-4a18-8322-f5335b8b15b4"
},
{
  title: "Getting Started with Ruby: A Beginner's Guide",
  author: "Oliver",
  body: "<h1><strong>Getting Started with Ruby: A Beginner's Guide</strong></h1><p></p><p>This article serves as an introduction to Ruby for beginners. It covers the basics of Ruby syntax, data types, variables, and how to write simple programs in Ruby.</p><pre><code class=\"language-ruby\"># Hello, World! in Ruby\nputs \"Hello, World!\"\n</code></pre>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 20:05:33.694330000 UTC +00:00",
  category_id: "e7688066-117f-4439-bab1-b5434d0836cd"
},
{
  title: "Ruby on Rails: Building a Web Application from Scratch",
  author: "Oliver",
  body: "<h1><strong>Ruby on Rails: Building a Web Application from Scratch</strong></h1><p></p><p></p><p><span style=\"background-color: rgb(247, 247, 248); color: rgb(55, 65, 81)\">This article guides you through building a basic web application using the Ruby on Rails framework. It covers creating a new Rails project, setting up routes, controllers, and views, and implementing a simple CRUD (Create, Read, Update, Delete) application.</span></p><p></p><p></p><pre><code class=\"language-ruby\"># Creating a new Rails application\nrails new myapp\n\n# Generating a model, controller, and views\nrails generate scaffold Task title:string description:text\n</code></pre>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 20:06:11.217155000 UTC +00:00",
  category_id: "e7688066-117f-4439-bab1-b5434d0836cd"
},
{
  title: "India: A Mosaic of Cultures and Traditions",
  author: "Oliver",
  body: "<p><strong>India: A Mosaic of Cultures and Traditions</strong></p><p></p><p>India is a land of incredible diversity, where a multitude of cultures, languages, and traditions coexist. This article explores the rich tapestry of India's cultural heritage, delving into its ancient history, languages, religious diversity, art forms, and traditional practices. It highlights the beauty of India's cultural mosaic and the influences that have shaped its identity over thousands of years.</p><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "16ff422d-0b14-4ed4-874c-cf81bf08eb31"
},
{
  title: "Indian History: From Ancient Civilizations to Modern Nationhood",
  author: "Oliver",
  body: "<h1><strong>Indian History: From Ancient Civilizations to Modern Nationhood</strong></h1><p></p><p>India boasts a storied history that spans millennia, from the ancient Indus Valley Civilization to its journey to independence and the modern nation it has become. This article offers a comprehensive historical overview, touching upon key periods, rulers, empires, and significant events that have shaped India's past. It also explores the struggles for independence and the contributions of leaders like Mahatma Gandhi.</p><p></p><p></p><p>India's history is a tapestry of empires, dynasties, and cultural exchanges. It includes the Mauryan and Gupta empires, the Mughal dynasty, and the colonial period under British rule. The article delves into the achievements and legacies of these periods and the transformative events that led to India's emergence as an independent nation in 1947</p>",
  status: "Published",
  last_published_at: "Fri, 27 Oct 2023 20:03:30.679128000 UTC +00:00",
  category_id: "16ff422d-0b14-4ed4-874c-cf81bf08eb31"
},
{
  title: "Generating image from an element",
  author: "Oliver",
  body: "<h1>Generating image from an element</h1><p></p><p><span style=\"color: #e32b2b\">While most browsers support navigator.clipboard.writeText property which is used to write a string to clipboard, it gets little tricky when you want to copy an image to clipboard. There's no common way for copying a blob image to clipboard for all browsers.</span></p><p></p><p>While working on an app that generates image from a tweet and lets you save it, I wanted to add ability to let users copy the image directly to clipboard. The implementation seemed simple until I started working on it. The problem is that browsers have different specs for writing a blob to clipboard.</p><p></p><ul><li><p>Unfortunately, there's no way(or I haven't found one) to copy a blob image to clipboard in Firefox. </p></li><li><p>There's no way to copy <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.google.com/search?q=flowers&amp;sca_esv=574459239&amp;rlz=1C5CHFA_enIN1066IN1066&amp;tbm=isch&amp;source=lnms&amp;sa=X&amp;ved=2ahUKEwjov-zi5v-BAxUibGwGHXrOBkUQ_AUoAXoECAQQAw&amp;biw=1280&amp;bih=715&amp;dpr=2\">multiple images</a> in one go.</p></li></ul><pre><code class=\"language-javascript\">let sector;\n{\n  // These variables are scoped to this block and are not\n  // accessible after the block\n  const angle = Math.PI / 3;\n  const radius = 10;\n  sector = {\n    radius,\n    angle,\n    area: (angle / 2) * radius ** 2,\n    perimeter: 2 * radius + angle * radius,\n  };\n}\nconsole.log(sector);\n// {\n//   radius: 10,\n//   angle: 1.0471975511965976,\n//   area: 52.35987755982988,\n//   perimeter: 30.471975511965976\n// }\nconsole.log(typeof radius); // \"undefined\"</code></pre>",
  status: "Published",
  last_published_at: "Thu, 26 Oct 2023 03:17:03.028233000 UTC +00:00",
  category_id: "16ff422d-0b14-4ed4-874c-cf81bf08eb31"
},
{
  title: "India's Economic Landscape: Growth, Challenges, and Potential",
  author: "Oliver",
  body: "<h1><strong>India's Economic Landscape: Growth, Challenges, and Potential</strong></h1><p></p><p>India's economic journey is marked by dynamic growth, emerging as one of the world's largest economies. This article examines India's economic landscape, discussing key sectors like information technology, agriculture, manufacturing, and services. It also addresses challenges such as income inequality, infrastructure development, and the pursuit of sustainable growth.</p><p></p><p></p><p></p><p><strong>Additional Content:</strong></p><p> India's economy has witnessed significant growth in recent decades, becoming a hub for IT services, pharmaceuticals, and more. The article explores the impact of economic reforms and globalization on India's growth trajectory. It also delves into the complexities of addressing social and economic disparities while pursuing economic development and modernization.</p><p><br></p>",
  status: "Draft",
  last_published_at: nil,
  category_id: "16ff422d-0b14-4ed4-874c-cf81bf08eb31"
},
]
end



# rubocop:enable Layout/LineLength
