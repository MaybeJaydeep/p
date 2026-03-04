/**
 * Curated learning resources keyed by skill name (lowercase, normalized).
 * Each resource has a name and URL.
 */
const RESOURCES = {
  // ── Fundamentals ────────────────────────────────────────────────────────
  "data structures": [
    { name: "Striver's A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
    { name: "NeetCode 150", url: "https://neetcode.io/practice" },
    { name: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" },
  ],
  algorithms: [
    { name: "CP-Algorithms", url: "https://cp-algorithms.com" },
    { name: "Algorithm Visualizer", url: "https://algorithm-visualizer.org" },
    { name: "LeetCode Explore", url: "https://leetcode.com/explore/" },
  ],
  "system design": [
    { name: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer" },
    { name: "ByteByteGo", url: "https://bytebytego.com" },
    { name: "Grokking System Design", url: "https://www.educative.io/courses/grokking-the-system-design-interview" },
  ],
  "object oriented programming": [
    { name: "OOP Concepts — GFG", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" },
    { name: "Refactoring Guru Design Patterns", url: "https://refactoring.guru/design-patterns" },
  ],
  "design patterns": [
    { name: "Refactoring Guru", url: "https://refactoring.guru/design-patterns" },
    { name: "SourceMaking Patterns", url: "https://sourcemaking.com/design_patterns" },
  ],
  agile: [
    { name: "Agile Manifesto", url: "https://agilemanifesto.org" },
    { name: "Scrum Guide", url: "https://scrumguides.org" },
  ],
  scrum: [
    { name: "Scrum.org", url: "https://www.scrum.org/resources/what-is-scrum" },
    { name: "Scrum Guide", url: "https://scrumguides.org" },
  ],
  "problem solving": [
    { name: "LeetCode", url: "https://leetcode.com" },
    { name: "HackerRank", url: "https://www.hackerrank.com" },
    { name: "Codeforces", url: "https://codeforces.com" },
  ],
  "competitive programming": [
    { name: "Codeforces", url: "https://codeforces.com" },
    { name: "CP-Algorithms", url: "https://cp-algorithms.com" },
    { name: "CSES Problem Set", url: "https://cses.fi/problemset/" },
  ],

  // ── Languages ────────────────────────────────────────────────────────────
  javascript: [
    { name: "javascript.info", url: "https://javascript.info" },
    { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net" },
  ],
  typescript: [
    { name: "TypeScript Official Docs", url: "https://www.typescriptlang.org/docs/" },
    { name: "Total TypeScript", url: "https://www.totaltypescript.com" },
    { name: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript" },
  ],
  python: [
    { name: "Python Official Docs", url: "https://docs.python.org/3/" },
    { name: "Real Python", url: "https://realpython.com" },
    { name: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com" },
  ],
  java: [
    { name: "Java Official Docs", url: "https://docs.oracle.com/en/java/" },
    { name: "Baeldung Java", url: "https://www.baeldung.com" },
    { name: "Java Brains", url: "https://javabrains.io" },
  ],
  go: [
    { name: "Go Official Tour", url: "https://go.dev/tour" },
    { name: "Go by Example", url: "https://gobyexample.com" },
    { name: "Effective Go", url: "https://go.dev/doc/effective_go" },
  ],
  rust: [
    { name: "The Rust Book", url: "https://doc.rust-lang.org/book/" },
    { name: "Rust by Example", url: "https://doc.rust-lang.org/rust-by-example/" },
  ],
  "c++": [
    { name: "cppreference.com", url: "https://en.cppreference.com" },
    { name: "LearnCpp.com", url: "https://www.learncpp.com" },
  ],
  "c#": [
    { name: "Microsoft C# Docs", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { name: "C# Station", url: "https://csharp-station.com/Tutorial/CSharp/smartcatch.html" },
  ],
  kotlin: [
    { name: "Kotlin Official Docs", url: "https://kotlinlang.org/docs/home.html" },
    { name: "Kotlin by JetBrains", url: "https://play.kotlinlang.org" },
  ],
  swift: [
    { name: "Swift Official Docs", url: "https://swift.org/documentation/" },
    { name: "Hacking with Swift", url: "https://www.hackingwithswift.com" },
  ],

  // ── Frontend ─────────────────────────────────────────────────────────────
  react: [
    { name: "React Official Docs", url: "https://react.dev" },
    { name: "Full Stack Open", url: "https://fullstackopen.com/en/" },
    { name: "Epicreact.dev", url: "https://epicreact.dev" },
  ],
  vue: [
    { name: "Vue Official Docs", url: "https://vuejs.org/guide/introduction.html" },
    { name: "Vue Mastery", url: "https://www.vuemastery.com" },
  ],
  angular: [
    { name: "Angular Official Docs", url: "https://angular.io/docs" },
    { name: "Angular University", url: "https://angular-university.io" },
  ],
  next: [
    { name: "Next.js Official Docs", url: "https://nextjs.org/docs" },
    { name: "Learn Next.js", url: "https://nextjs.org/learn" },
  ],
  svelte: [
    { name: "Svelte Official Tutorial", url: "https://learn.svelte.dev" },
    { name: "Svelte Docs", url: "https://svelte.dev/docs" },
  ],
  html: [
    { name: "MDN HTML Reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "HTML.com Guide", url: "https://html.com" },
  ],
  css: [
    { name: "MDN CSS Reference", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "CSS-Tricks", url: "https://css-tricks.com" },
    { name: "Flexbox Froggy", url: "https://flexboxfroggy.com" },
  ],
  tailwind: [
    { name: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" },
    { name: "Tailwind UI Components", url: "https://tailwindui.com" },
  ],
  redux: [
    { name: "Redux Official Docs", url: "https://redux.js.org" },
    { name: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org" },
  ],
  graphql: [
    { name: "GraphQL Official Docs", url: "https://graphql.org/learn/" },
    { name: "How to GraphQL", url: "https://www.howtographql.com" },
  ],

  // ── Backend ──────────────────────────────────────────────────────────────
  node: [
    { name: "Node.js Official Docs", url: "https://nodejs.org/docs/latest/api/" },
    { name: "The Odin Project – Node", url: "https://www.theodinproject.com/paths/full-stack-javascript" },
  ],
  express: [
    { name: "Express.js Official Docs", url: "https://expressjs.com" },
    { name: "MDN Express Tutorial", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" },
  ],
  nestjs: [
    { name: "NestJS Official Docs", url: "https://docs.nestjs.com" },
    { name: "NestJS Courses", url: "https://courses.nestjs.com" },
  ],
  django: [
    { name: "Django Official Docs", url: "https://docs.djangoproject.com" },
    { name: "Django Girls Tutorial", url: "https://tutorial.djangogirls.org" },
  ],
  flask: [
    { name: "Flask Official Docs", url: "https://flask.palletsprojects.com" },
    { name: "Flask Mega Tutorial", url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world" },
  ],
  fastapi: [
    { name: "FastAPI Official Docs", url: "https://fastapi.tiangolo.com" },
    { name: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" },
  ],
  "spring boot": [
    { name: "Spring Official Docs", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
    { name: "Baeldung Spring Boot", url: "https://www.baeldung.com/spring-boot" },
  ],
  "rest api": [
    { name: "REST API Tutorial", url: "https://restfulapi.net" },
    { name: "Postman Learning Center", url: "https://learning.postman.com" },
  ],
  microservices: [
    { name: "Microservices.io Patterns", url: "https://microservices.io/patterns/index.html" },
    { name: "Martin Fowler on Microservices", url: "https://martinfowler.com/articles/microservices.html" },
  ],
  kafka: [
    { name: "Apache Kafka Docs", url: "https://kafka.apache.org/documentation/" },
    { name: "Confluent Kafka Tutorials", url: "https://developer.confluent.io/tutorials/" },
  ],

  // ── Database ─────────────────────────────────────────────────────────────
  mongodb: [
    { name: "MongoDB University", url: "https://university.mongodb.com" },
    { name: "MongoDB Official Docs", url: "https://www.mongodb.com/docs/" },
  ],
  postgresql: [
    { name: "PostgreSQL Official Docs", url: "https://www.postgresql.org/docs/" },
    { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com" },
  ],
  mysql: [
    { name: "MySQL Official Docs", url: "https://dev.mysql.com/doc/" },
    { name: "SQLZoo MySQL", url: "https://sqlzoo.net" },
  ],
  sql: [
    { name: "SQLZoo", url: "https://sqlzoo.net" },
    { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
    { name: "LeetCode SQL Problems", url: "https://leetcode.com/problemset/database/" },
  ],
  redis: [
    { name: "Redis Official Docs", url: "https://redis.io/docs/" },
    { name: "Redis University", url: "https://university.redis.com" },
  ],
  elasticsearch: [
    { name: "Elasticsearch Docs", url: "https://www.elastic.co/guide/index.html" },
    { name: "Elastic Search Tutorials", url: "https://www.elastic.co/learn" },
  ],
  firebase: [
    { name: "Firebase Docs", url: "https://firebase.google.com/docs" },
    { name: "Firebase Codelab", url: "https://firebase.google.com/codelabs/firestore-web" },
  ],
  dynamodb: [
    { name: "AWS DynamoDB Developer Guide", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" },
  ],

  // ── DevOps & Cloud ───────────────────────────────────────────────────────
  docker: [
    { name: "Docker Official Docs", url: "https://docs.docker.com" },
    { name: "Play with Docker", url: "https://labs.play-with-docker.com" },
  ],
  kubernetes: [
    { name: "Kubernetes Official Docs", url: "https://kubernetes.io/docs/home/" },
    { name: "Kubernetes by Example", url: "https://kubernetesbyexample.com" },
    { name: "KillerCoda K8s Tutorials", url: "https://killercoda.com/playgrounds/scenario/kubernetes" },
  ],
  aws: [
    { name: "AWS Skill Builder", url: "https://skillbuilder.aws" },
    { name: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
    { name: "Stephane Maarek – Udemy AWS", url: "https://www.udemy.com/user/stephane-maarek/" },
  ],
  gcp: [
    { name: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google" },
    { name: "GCP Codelabs", url: "https://codelabs.developers.google.com/?cat=cloud" },
  ],
  azure: [
    { name: "Microsoft Learn – Azure", url: "https://learn.microsoft.com/en-us/azure/" },
    { name: "Azure Free Account", url: "https://azure.microsoft.com/en-us/free/" },
  ],
  "github actions": [
    { name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
    { name: "GitHub Actions Starter Workflows", url: "https://github.com/actions/starter-workflows" },
  ],
  terraform: [
    { name: "Terraform Official Docs", url: "https://developer.hashicorp.com/terraform" },
    { name: "Terraform Get Started", url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started" },
  ],
  linux: [
    { name: "The Linux Command Line (free book)", url: "https://linuxcommand.org/tlcl.php" },
    { name: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/" },
  ],
  "ci cd": [
    { name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
    { name: "CI/CD with GitLab", url: "https://docs.gitlab.com/ee/ci/" },
  ],

  // ── ML & AI ──────────────────────────────────────────────────────────────
  "machine learning": [
    { name: "Coursera ML Specialization (Andrew Ng)", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
    { name: "Fast.ai", url: "https://www.fast.ai" },
    { name: "Kaggle Learn – ML", url: "https://www.kaggle.com/learn" },
  ],
  "deep learning": [
    { name: "DeepLearning.AI", url: "https://www.deeplearning.ai" },
    { name: "d2l.ai – Dive into Deep Learning", url: "https://d2l.ai" },
    { name: "Fast.ai Deep Learning", url: "https://www.fast.ai" },
  ],
  tensorflow: [
    { name: "TensorFlow Official Docs", url: "https://www.tensorflow.org/learn" },
    { name: "TF Tutorials", url: "https://www.tensorflow.org/tutorials" },
  ],
  pytorch: [
    { name: "PyTorch Official Docs", url: "https://pytorch.org/docs/stable/index.html" },
    { name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" },
  ],
  "scikit learn": [
    { name: "Scikit-learn Official Docs", url: "https://scikit-learn.org/stable/user_guide.html" },
    { name: "Kaggle – Intro to ML", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
  ],
  pandas: [
    { name: "Pandas Official Docs", url: "https://pandas.pydata.org/docs/" },
    { name: "Kaggle Pandas Course", url: "https://www.kaggle.com/learn/pandas" },
  ],
  numpy: [
    { name: "NumPy Official Docs", url: "https://numpy.org/doc/stable/" },
    { name: "NumPy for Beginners", url: "https://numpy.org/doc/stable/user/absolute_beginners.html" },
  ],
  nlp: [
    { name: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course" },
    { name: "Stanford NLP Course", url: "https://web.stanford.edu/class/cs224n/" },
  ],
  "computer vision": [
    { name: "CS231n Stanford", url: "https://cs231n.stanford.edu" },
    { name: "OpenCV Tutorials", url: "https://docs.opencv.org/4.x/d9/df8/tutorial_root.html" },
  ],
  llm: [
    { name: "Full Stack LLM Bootcamp", url: "https://fullstackdeeplearning.com/llm-bootcamp/" },
    { name: "mlabonne/llm-course (GitHub)", url: "https://github.com/mlabonne/llm-course" },
    { name: "Hugging Face Course", url: "https://huggingface.co/learn" },
  ],
  langchain: [
    { name: "LangChain Docs", url: "https://python.langchain.com/docs/get_started/introduction" },
    { name: "LangChain Cookbook", url: "https://github.com/langchain-ai/langchain/tree/master/cookbook" },
  ],

  // ── Testing ──────────────────────────────────────────────────────────────
  jest: [
    { name: "Jest Official Docs", url: "https://jestjs.io/docs/getting-started" },
    { name: "Testing JavaScript (Kent C. Dodds)", url: "https://testingjavascript.com" },
  ],
  cypress: [
    { name: "Cypress Official Docs", url: "https://docs.cypress.io" },
    { name: "Cypress Real World App", url: "https://github.com/cypress-io/cypress-realworld-app" },
  ],
  playwright: [
    { name: "Playwright Official Docs", url: "https://playwright.dev" },
    { name: "Playwright Tutorial", url: "https://playwright.dev/docs/intro" },
  ],
  pytest: [
    { name: "Pytest Official Docs", url: "https://docs.pytest.org/en/stable/" },
    { name: "Real Python – Pytest", url: "https://realpython.com/pytest-python-testing/" },
  ],
  "unit testing": [
    { name: "Martin Fowler – Unit Testing", url: "https://martinfowler.com/bliki/UnitTest.html" },
    { name: "Testing JavaScript", url: "https://testingjavascript.com" },
  ],
  "test driven development": [
    { name: "TDD Guide — Kent Beck", url: "https://martinfowler.com/bliki/TestDrivenDevelopment.html" },
    { name: "TDD in Practice", url: "https://www.agilealliance.org/glossary/tdd/" },
  ],

  // ── Mobile ───────────────────────────────────────────────────────────────
  "react native": [
    { name: "React Native Official Docs", url: "https://reactnative.dev/docs/getting-started" },
    { name: "Expo Go", url: "https://expo.dev" },
  ],
  flutter: [
    { name: "Flutter Official Docs", url: "https://docs.flutter.dev" },
    { name: "Flutter Cookbook", url: "https://docs.flutter.dev/cookbook" },
  ],
  "jetpack compose": [
    { name: "Jetpack Compose Docs", url: "https://developer.android.com/jetpack/compose/documentation" },
    { name: "Compose Pathway", url: "https://developer.android.com/courses/pathways/compose" },
  ],
  swiftui: [
    { name: "Apple SwiftUI Docs", url: "https://developer.apple.com/xcode/swiftui/" },
    { name: "Hacking with SwiftUI", url: "https://www.hackingwithswift.com/quick-start/swiftui" },
  ],

  // ── Tools ────────────────────────────────────────────────────────────────
  git: [
    { name: "Pro Git Book (Free)", url: "https://git-scm.com/book/en/v2" },
    { name: "Learn Git Branching", url: "https://learngitbranching.js.org" },
  ],
  github: [
    { name: "GitHub Skills", url: "https://skills.github.com" },
    { name: "GitHub Docs", url: "https://docs.github.com" },
  ],
  postman: [
    { name: "Postman Learning Center", url: "https://learning.postman.com" },
    { name: "Postman Academy", url: "https://academy.postman.com" },
  ],
  figma: [
    { name: "Figma Help Center", url: "https://help.figma.com/hc/en-us" },
    { name: "Figma for Beginners", url: "https://www.figma.com/resources/learn-design/" },
  ],
};

export default RESOURCES;
