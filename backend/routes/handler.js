const express = require('express');
const { Schema } = require('mongoose');
const router = express.Router();
const Schemas = require('../models/Schemas.js');
const app = express();
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const filePath = path.join(__dirname, 'data.yml');
const ymlData = fs.readFileSync(filePath, 'utf8');
const data = yaml.load(ymlData);

const verificationToken = uuidv4();

var currentUser = "Guest";

let previewCourses = [
  {
    number: "CSE 1223",
    name: "Intro to Java",
    rating: 0,
    tech: ["Java"]
  },
  {
    number: "CSE 2221",
    name: "Software I: Software Components",
    rating: 0,
    tech: ["Java", "HTML", "CSS", "XML", "JUnit", "Swing", "Eclipse"]
  },
  {
    number: "CSE 2231",
    name: "Software II: Software Design & Development",
    rating: 0,
    tech: ["Java", "Apache Subversion", "HTML", "JUnit", "Collections", "Eclipse"]
  },
  {
    number: "CSE 2321",
    name: "Foundations I: Discrete Structures",
    rating: 0,
    tech: []
  },
  {
    number: "CSE 2331",
    name: "Foundations II: Data Structures & Algorithms",
    rating: 0,
    tech: []
  },
  {
    number: "CSE 2421",
    name: "Systems I: Low-Level Programming & Computer Organization",
    rating: 0,
    tech: ["C", "x86 Assembly", "Linux"]
  },
  {
    number: "CSE 2431",
    name: "Systems II: Operating Systems",
    rating: 0,
    tech: ["C", "Linux"]
  },
  {
    number: "CSE 3231",
    name: "Software Engineering Techniques",
    rating: 0,
    tech: ["Agile", "Scrum", "Trello"]
  },
  {
    number: "CSE 3241",
    name: "Database Systems",
    rating: 0,
    tech: ["SQLite", "PHP", "DataGrip"]
  },
  {
    number: "CSE 3341",
    name: "Principles of Programming Languages",
    rating: 0,
    tech: ["Java", "Python", "Shell", "Scheme48"]
  },
  {
    number: "CSE 3421",
    name: "Computer Architecture",
    rating: 0,
    tech: []
  },
  {
    number: "CSE 3461",
    name: "Computer Networking & Internet Technologies",
    rating: 0,
    tech: ["Python"]
  },
  {
    number: "CSE 3521",
    name: "Artificial Intelligence",
    rating: 0,
    tech: ["Python", "numPy", "tensorflow"]
  },
  {
    number: "CSE 3541",
    name: "Computer Game & Animation Techniques",
    rating: 0,
    tech: ["C#", "Unity"]
  },
  {
    number: "CSE 3901",
    name: "Project: Web Applications",
    rating: 0,
    tech: ["Git", "Ruby", "HTML", "CSS", "JavaScript", "Ruby on Rails", "SQLite", "Visual Studio Code", "Ubuntu"]
  },
  {
    number: "CSE 3902",
    name: "Project: Interactive Systems",
    rating: 0,
    tech: ["C#"]
  },
  {
    number: "CSE 3903",
    name: "Project: System Software",
    rating: "n/a",
    tech: []
  },
  {
    number: "CSE 5911",
    name: "Capstone: Software Applications",
    rating: 0,
    tech: []
  },
  {
    number: "CSE 5912",
    name: "Capstone: Game Design & Development",
    rating: 0,
    tech: []
  },
  {
    number: "CSE 5913",
    name: "Capstone: Computer Animation",
    rating: "n/a",
    tech: []
  },
  {
    number: "CSE 5914",
    name: "Capstone: Knowledge-Based System",
    rating: "n/a",
    tech: []
  },
  {
    number: "CSE 5915",
    name: "Capstone: Information Systems",
    rating: "n/a",
    tech: []
  }
];

let courses = [
    {
      number: "ENGR 1100",
      name: "Intro to Ohio State and Engineering",
      rating: 0,
      tech: [],
      description: "Academic success and planning; Academic rights and responsibilities Code of Academic Conduct; Time management and study skills; University policies and procedures; Major specific topics and career exploration. "
    },
    {
      number: "MATH 1151",
      name: "Calculus I",
      rating: 0,
      tech: [],
      description: "Limits; Derivative; Product & Quotient Rules; Chain Rule; Linear Approximations; L'Hospital's Rule; Integrals; Fundamental Theorem of Calculus; "
    },
    {
      number: "MATH 1152",
      name: "Calculus II",
      rating: 0,
      tech: [],
      description: "Integration by Parts; Trigonometric Substitution; Improper Integrals; Series; Divergence Test; Taylor Series; Parametric & Polar Equations; Dot Products; Cross Products; "
    },
    {
      number: "MATH 1172",
      name: "Engineering Mathematics A",
      rating: 0,
      tech: [],
      description: "Integration by Parts; Trigonometric Substitution; Improper Integrals; Series; Divergence Test; Taylor Series; Parametric & Polor Equations; Vectors in 3D; Dot Products; Cross Products; Multivariable Calculus; "
    },
    {
      number: "ENGR 1181",
      name: "Fundamentals of Engineering I",
      rating: 0,
      tech: ["Excel", "MATLAB"],
      description: "Teamwork fundamentals; Problem solving fundamentals; Excel spreadsheet structure; Engineering ethics; Introductory MATLAB;"
    },
    {
      number: "ENGR 1182",
      name: "Fundamentals of Engineering II",
      rating: 0,
      tech: ["SOLIDWORKS"],
      description: "Engineering design fundamentals; Visualization of 3D objects (Sketching, Pictorials, & Orthographics); Introductory CAD; Conventions and Standards (Dimensioning, Tolerance, Sections) "
    },
    {
      number: "CSE 1222",
      name: "Introduction to Computer Programming in C++",
      rating: 0,
      tech: ["C++"],
      description: "I/O; Variables & assignments; Selection statements; Loops; File I/O; Functions & classes; Arrays; Pointers; "
    },
    {
      number: "CSE 1223",
      name: "Introduction to Computer Programming in Java",
      rating: 0,
      tech: ["Java"],
      description: "Primitive types; I/O, Selection Statements; Arrays; File I/O; Exception handling; Classes & Objects; "
    },
    {
      number: "CSE 1224",
      name: "Introduction to Computer Programming in Python",
      rating: 0,
      tech: ["Python"],
      description: "Types; I/O; Data Structures; Selection Statements; Functions; File I/O; Classes & Objects; Searching Algorithms; "
    },
    {
        number: "PHYS 1250",
        name: "Mechanics, Work and Energy, Thermal Physics",
        rating: 0,
        tech: [], 
        description: "Newton's Laws; Work & Energy; Fluids; Thermodynamics;"
    },
    {
      number: "ENGR 1281",
      name: "Honors Fundamentals of Engineering I",
      rating: 0,
      tech: ["Excel", "MATLAB", "C", "C++", "Linux", "Visual Studio Code"],
      description: ""
    },
    {
      number: "ENGR 1282",
      name: "Honors Fundamentals of Engineering II",
      rating: 0,
      tech: ["C++", "Robotics", "SOLIDWORKS"],
      description: ""
    },
    {
      number: "ECE 2020",
      name: "Analog Systems and Circuits",
      rating: 0,
      tech: ["Breadboard", "Solidering", "Keysight Osilloscope"],
      description: ""
    },
    {
      number: "ECE 2060",
      name: "Introduction to Digital Logic",
      rating: 0,
      tech: ["VHDL", "Proteus", "DE10 Liteboard"],
      description: ""
    },
    {
      number: "CSE 2122",
      name: "Data Structures using C++",
      rating: 0,
      tech: ["C++"],
      description: ""
    },
    {
      number: "CSE 2123",
      name: "Data Structures using Java",
      rating: 0,
      tech: ["Java", "JUnit"],
      description: ""
    },
    {
      number: "MATH 2153",
      name: "Calculus III",
      rating: 0,
      tech: [],
      description: "Vectors; Multivariable Calculus; Multiple Integration; Vector Calculus; "
    },
    {
      number: "MATH 2173",
      name: "Engineerng Mathematics B",
      rating: 0,
      tech: [],
      description: "Vectors; Multivariable Calculus; Multiple Integrals; Line Integrals; Second Order Ordinary Differential Equations; "
    },
    {
      number: "CSE 2221",
      name: "Software I: Software Components",
      rating: 0,
      tech: ["Java", "HTML", "CSS", "XML", "JUnit", "Swing", "Eclipse"],
      description: "Java Review; OOP; XMLTree; RSS; Debugging; Recursion; JUnit Testing' Data Structures (Queue, Set, Stack, Map); MVC Patterning; GUI Development with Swing Framework;"
    },
    {
      number: "CSE 2231",
      name: "Software II: Software Design & Development",
      rating: 0,
      tech: ["Java", "Apache Subversion", "HTML", "JUnit", "Collections", "Eclipse"],
      description: "Advanced OOP; JUnit Testing, Kernel Implementations; Version Control; Hashing; Tokenizing; Javadocs; Data Structures (Tree, Binary Tree, AST, BST, Heap, Singly-Linked Lists, Doubly-Linked Lists); Collections Framework; IOExceptions; "
    },
    {
      number: "CSE 2321",
      name: "Foundations I: Discrete Structures",
      rating: 0,
      tech: [],
      description: "Mathematical Reasoning; Algorithm Analysis; Sorting & Searching; Graph Theory; Graph Algorithms; "
    },
    {
      number: "CSE 2331",
      name: "Foundations II: Data Structures & Algorithms",
      rating: 0,
      tech: [],
      description: "Runtime Analysis; Recursive Algorithms; Hashing; Graph Algorithms; Backtracking Algorithms; Sorting & Selection; "
    },
    {
      number: "CSE 2421",
      name: "Systems I: Introduction to Low-Level Programming and Computer Organization",
      rating: 0,
      tech: ["C", "gdb", "x86 Assembly", "Linux"], 
      description: ""
    },
    {
      number: "CSE 2431",
      name: "Systems II: Operating Systems",
      rating: 0,
      tech: ["C", "Linux"],
      description: ""
    },
    {
      number: "CSE 2451",
      name: "Advanced C Programming",
      rating: 0,
      tech: ["C", "Linux", "gdb"],
      description: "Introductory C; Unix; Pointers; Dynamic data structures; String manipulation; Command line argument passing; Debugging with gdb; Makefile; Bit operations; "
    },
    {
      number: "MATH 2568",
      name: "Linear Algebra",
      rating: 0,
      tech: ["MATLAB"],
      description: "Matrix Operations; Vector Spaces; Linear Independence; Eigenvalues & Eigenvectors; Diagonalization; "
    },
    {
      number: "CSE 3231",
      name: "Software Engineering Techniques",
      rating: 0,
      tech: ["Agile", "Scrum", "Trello"],
      description: ""
    },
    {
      number: "CSE 3232",
      name: "Software Requirements Analysis",
      rating: 0,
      tech: ["Agile", "Scrum", "Trello", "Excel", "Microsoft Teams"],
      description: "Software Development Lifecycle;  Object-Oriented Analysis; UML; Requirements Elicitationl"
    },
    {
      number: "CSE 3241",
      name: "Introduction to Database Systems",
      rating: 0,
      tech: ["SQLite", "PHP", "DataGrip"],
      description: "Entity-Relationship Model; Relational Data Model; Relational Algebra; Relational Calculus; Functional Dependencies & Normalization; Introductory SQL; Database Design; Database Project; "
    },
    {
      number: "CSE 3321",
      name: "Automata and Formal Languages",
      rating: 0,
      tech: [],
      description: "Machine-based and grammatical models of computation; finite automata and regular languages, pushdown automata and context-free languages, Turing machines; non-determinism; Church's Thesis; "
    },
    {
      number: "CSE 3244",
      name: "Data Management in the Cloud",
      rating: 0,
      tech: [],
      description: "Systematic organization of data on cloud computing architectures; basic indexing techniques, including B-tree and hash-based indexing; fundamentals of query optimization, including access path selection and cardinality estimation; full and partial replication; data partitioning and distributed task scheduling; "
    },
    {
      number: "CSE 3341",
      name: "Principles of Programming Languages",
      rating: 0,
      tech: ["Java", "Python", "Shell", "Scheme48"],
      description: ""
    },
    {
      number: "MATH 3345",
      name: "Fundamentals of Higher Mathematics",
      rating: 0,
      tech: [],
      description: "Propositional calculus; Mathematical proofs; Mathematical induction; Sets and functions; Infinite sets;"
    },
    {
      number: "CSE 3421",
      name: "Introduction to Computer Architecture",
      rating: 0,
      tech: [],
      description: "MIPS processor/memory instruction set architecture; Processor/memory performance metrics; Register file design; Main memory (SRAM and DRAM) design; Design of integer arithmetic logic unit (ALU); Floating point representation and arithmetic; Design of datapath and hard-wired control (single-cycle case); Design of datapath and hard-wired control (multi-cycle case); Cache architecture; Multi-core, SMP, and datacenters; "
    },
    {
      number: "CSE 3430",
      name: "Overview of Computer Systems for Non-Majors",
      rating: 0,
      tech: [],
      description: "Introduction to computer architecture and organization at machine and assembly level; pointers and addressing using C programming; introduction to operating system concepts: process, memory management, file system and storage, and multi-threaded programming; "
    },
    {
      number: "CSE 3461",
      name: "Computer Networking & Internet Technologies",
      rating: 0,
      tech: ["Python"],
      description: "Internet applications; TCPI & IP Layers; Internat data link & physical layers; Wireless networks; Network security;"
    },
    {
        number: "STAT 3470",
        name: "Prability & Statistics",
        rating: 0,
        tech: [],
        description: "Introduction to probability, Bayes theorem; discrete and continuous random variables, expected value, probability distributions; point and interval estimation; hypotheses tests for means and proportions; least squares regression."
    },
    {
      number: "CSE 3521",
      name: "Artificial Intelligence",
      rating: 0,
      tech: ["Python", "numPy", "Matplotlib", "tensorflow"],
      description: ""
    },
    {
      number: "CSE 3541",
      name: "Computer Game & Animation Techniques",
      rating: 0,
      tech: ["C#", "Unity"],
      description: "Introductory Unity; 3D Modeling; Trnasformations; Collision Detection; Pathfinding; Interpolation; "
    },
    {
      number: "CSE 3901",
      name: "Project: Design, Development, and Documentation of Web Applications",
      rating: 0,
      tech: ["Git", "Ruby on Rails", "HTML", "CSS", "JavaScript", "Middleman", "Devise", "SQLite", "Visual Studio Code"],
      description: ""
    },
    {
      number: "CSE 3902",
      name: "Project: Design, Development, and Documentation of Interactive Systems",
      rating: 0,
      tech: ["C#", "Git", "MonoGame", "Agile", "Visual Studio"],
      description: "Intensive group project involving design, development, and documentation of an interactive software system, a 2D interactive game; communication skills emphasized; builds programming maturity."
    },
    {
      number: "CSE 3903",
      name: "Project: System Software",
      rating: 0,
      tech: ["Assembly"],
      description: "Intensive group project involving design, development, and documentation of system software including an assembler and a linking loader; communication skills emphasized; builds programming maturity."
    },
    {
      number: "CSE 3903",
      name: "Project: System Software",
      rating: 0,
      tech: ["Assembly"],
      description: "Intensive group project involving design, development, and documentation of system software including an assembler and a linking loader; communication skills emphasized; builds programming maturity."
    },
    {
      number: "CSE 4251",
      name: "The UNIX Programming Environment",
      rating: 0,
      tech: ["UNIX"],
      description: "Introduction to the UNIX programming environment including: shell programming (csh); regular expressions; makefiles; grep, sed, and awk programming languages; "
  },
  {
    number: "CSE 4252",
    name: "Programming in C++",
    rating: 0,
    tech: ["C++"],
    description: "Syntax and pragmatics of C++ programming; C++ types, arrays, classes, pointers; objects and classes; compile-time vs. run-time picture; inheritance; template classes; "
    },
    {
      number: "CSE 4253",
      name: "Programming in C#",
      rating: 0,
      tech: ["C#", ".NET Framework"],
      description: "Syntax and pragmatics of C# programming; C# data types; .NET framework; OOP; Common Language Runtime (CLR); Garbage collections; GUI Programming on Windows; C# Documentations; "
      },
    {
      number: "CSE 4254",
      name: "Programming in Lisp",
      rating: 0,
      tech: ["Lisp"],
      description: "Syntax and pragmatics of Lisp programming; Data structures and program flow; s-expressions; Debugger; Functional programming paradigm;"
      },
      {
        number: "CSE 4256",
        name: "Programming in Python",
        rating: 0,
        tech: ["Python", "Numpy", "NLTK", "NetworkX"],
        description: "Syntax and pragmatics of Python programming; Python data structures (lists, tuples, strings, sets, dictionaries, deques); functional programming; OOP; Design patterns; Graph theory; Regular expressions; Various Python libraries; "
        },
    {
        number: "CSE 4471",
        name: "Information Security",
        rating: 0,
        tech: [],
        description: "Introduction to security of digital information; threats and attacks; regulations; risk management; attack detection and response; cryptography; forensics; technical training and certifications."
    },
    {
      number: "CSE 5234",
      name: "Distributed Enterprise Computing",
      rating: 0,
      tech: ["Java", "XML", "REST", "SOAP", "JSON", "AJAX"],
      description: "Current application and middleware frameworks for distributed enterprise computing; XML; Enterprise Java; SOAP and REST web services; AJAX and JSON; enterprise service bus; Hadoop; mobile computing; "
  },
  {
    number: "CSE 5235",
    name: "Applied Enterprise Architectures and Services",
    rating: 0,
    tech: ["Java", "XML", "REST", "SOAP", "JSON", "AJAX"],
    description: "Modeling/analysis of complex enterprise architectures; enterprise patterns (workflow, broker, warehousing); methods for service performance (lean, ontologies, data mining, etc.); emerging topics in semantic cyber-infrastructures, social computation; "
},
    {
        number: "CSE 5236",
        name: "Mobile Application Development",
        rating: 0,
        tech: ["Java", "Kotlin", "Dart", "Flutter", "React Native", "Android Studio", "Swift", "Xcode"],
        description: "Transaction management; query processing and optimization; organization of database systems, advanced indexing, multi-dimensional data, similarity-based analysis, performance evaluation, new database applications; "
    },
    {
      number: "CSE 5242",
      name: "Advanced Database Management Systems",
      rating: 0,
      tech: [],
      description: "Mobile application development frameworks; Architecture, design and engineering issues, techniques, methodologies for mobile application development."
  },
  {
    number: "CSE 5243",
    name: "Data Mining",
    rating: 0,
    tech: [],
    description: "Knowledge discovery, data mining, data preprocessing, data transformations; clustering, classification, frequent pattern mining, anomaly detection, graph and network analysis; applications; "
},
  {
    number: "CSE 5245",
    name: "Introduction to Network Science",
    rating: 0,
    tech: [],
    description: "Introduction to Network Science; Global and Local Network Measures; PageRank; Community Discovery Algorithms; Network Models; Understanding the role of network analysis in Web and Social network applications; "
  },
  {
    number: "CSE 5343",
    name: "Compiler Design and Implementation",
    rating: 0,
    tech: [],
    description: "Lexical and syntax analysis using compiler generation tools; type checking; intermediate code; control-flow analysis; dataflow analysis; code optimizations; code generation; compiler project; "
  },
  {
    number: "CSE 5351",
    name: "Introduction to Cryptography",
    rating: 0,
    tech: [],
    description: "Foundations of cryptography; mathematical formulations/proofs of security goals; theory and practical constructions of encryption schemes, MACs, digital signatures; zero-knowledge proof systems; cryptographic protocols; "
  },
  {
    number: "CSE 5361",
    name: "Numerical Methods",
    rating: 0,
    tech: [],
    description: "Numerical methods for scientific computation: computer arithmetic, rounding errors, machine precision, machine representation, root-finding, interpolation, integration, linear systems, splines, smoothing, curve-fitting, linear programming; "
  },
  {
    number: "CSE 5432",
    name: "Mobile Handset Systems and Networking",
    rating: 0,
    tech: [],
    description: "Mobile handset architecture: processors, memory, I/O devices, sensors, virtual machine and power management; different ranges of wireless communication technologies; TCP/IP over wireless; mobile social networking;"
  },
  {
    number: "CSE 5433",
    name: "Operating Systems Laboratory",
    rating: 0,
    tech: [],
    description: "Introduction to the internals of operating systems; designing and implementing components within commercial operating systems: system calls, CPU scheduling, context switching, process management, memory management, file systems;"
  },
  {
    number: "CSE 5441",
    name: "Introduction to Parrell Computing",
    rating: 0,
    tech: ["C"],
    description: "Parallel programming models; sequential and parallel performance issues; high-performance computer architecture; design, analysis, implementation and performance evaluation of parallel algorithms; "
  },
  {
    number: "CSE 5462",
    name: "Network Programming",
    rating: 0,
    tech: ["C", "C++", "TinyOS"],
    description: "IP-based socket programming in C/C++, TinyOS programming in NesC; "
  },
  {
    number: "CSE 5463",
    name: "Introduction to Wireless Networking",
    rating: 0,
    tech: ["C", "C++", "TinyOS"],
    description: "Fundamental concepts in cellular design, Wireless-LANs, MANETs, and sensor networks will be explored. Specific topics will include propagation, fading, cellular-design, power-management, routing, scheduling, and control; "
  },
  {
    number: "CSE 5471",
    name: "Introduction to Cybersecurity",
    rating: 0,
    tech: [],
    description: "Introduction to cybersecurity. Technical fundamentals of data, software, component, network, and system security. Cybersecurity from an organizational and societal view point, including human factors; "
  },
  {
    number: "CSE 5472",
    name: "Information Security Projects",
    rating: 0,
    tech: [],
    description: "Team-based projects: solve information security problems (mobile/static host/network hardening, intrusion detection and vulnerability scanning, forensics); results communicated through report writing and presentation; "
  },
  {
    number: "CSE 5473",
    name: "Network Security",
    rating: 0,
    tech: [],
    description: "Security threats and services, elements of cryptography, protocols for security services, network and internet security, advanced security issues and technologies; "
  },
  {
    number: "CSE 5474",
    name: "Software Security",
    rating: 0,
    tech: [],
    description: "Software security fundamentals, secure coding principles and practices, common software vulnerabilities, memory exploits (shell code), vulnerability analysis (e.g., reverse engineering, fuzzing and symbolic execution), and defenses against common vulnerability exploitation;"
  },
  {
    number: "CSE 5477",
    name: "Offenses Security",
    rating: 0,
    tech: [],
    description: "This course will give students an overview of existing offensive computing techniques, which include well known attacks that break confidentiality, integrity and availability of computing resources. Attacks targeting on human weaknesses without taking special care to security will also be discussed; "
  },
  {
    number: "CSE 5522",
    name: "Survey of Artificial Intelligence II: Advanced Techniques",
    rating: 0,
    tech: [],
    description: "Survey of advanced concepts, techniques, and applications of artificial intelligence, including knowledge representation, learning, natural language understanding, and vision; "
  },
  {
    number: "CSE 5523",
    name: "Machine Learning and Statistical Pattern Recognition",
    rating: 0,
    tech: [],
    description: "Introduction to basic concepts of machine learning and statistical pattern recognition; techniques for classification, clustering and data representation and their theoretical analysis; "
  },
  {
    number: "CSE 5524",
    name: "Computer Vision for Human-Computer Interaction",
    rating: 0,
    tech: [],
    description: "Computer vision algorithms for use in human-computer interactive systems; image formation, image features, segmentation, shape analysis, object tracking, motion calculation, and applications; "
  },
  {
    number: "CSE 5525",
    name: "Foundations of Speech and Language Processing",
    rating: 0,
    tech: [],
    description: "Fundamentals of natural language processing, automatic speech recognition and speech synthesis; lab projects concentrating on building systems to process written and/or spoken language; "
  },
  {
    number: "CSE 5526",
    name: "Introduction to Neural Networks",
    rating: 0,
    tech: [],
    description: "Survey of fundamental methods and techniques of neural networks; single- and multi-layer perceptrons; radial-basis function networks; support vector machines; recurrent networks; supervised and unsupervised learning; "
  },
  {
    number: "CSE 5542",
    name: "Real-Time Rendering",
    rating: 0,
    tech: [],
    description: "Comprehensive list of topics in real-time rendering using OpenGL and GLSL, including coordinate systems, transformations, viewing, illumination, texture mapping, and shader-based algorithms; "
  },
  {
    number: "CSE 5543",
    name: "Geometric Modeling",
    rating: 0,
    tech: [],
    description: "Common algorithmic and mathematical techniques for modeling geometric objects in computer graphics and CAD applications; sample based modeling, mesh generation, and hierarchical representations; "
  },
  {
    number: "CSE 5544",
    name: "Introduction to Data Visualization",
    rating: 0,
    tech: [],
    description: "Principles and methods for visualizing data from measurements and calculations in physical and life sciences, and transactional and social disciplines; information visualization; scientific visualization; "
  },
  {
    number: "CSE 5545",
    name: "Advanced Computer Graphics",
    rating: 0,
    tech: [],
    description: "Advanced topics in computer graphics; image synthesis, lighting and rendering, sampling and material properties, volume rendering; "
  },
    {
      number: "CSE 5911",
      name: "Capstone: Software Applications",
      rating: 0,
      tech: [],
      description: "Capstone design project: application of software engineering techniques, methodologies and technologies in software lifecycle activities using enterprise software frameworks; teamwork, written and oral communication."
    },
    {
      number: "CSE 5912",
      name: "Capstone: Game Design and Development",
      rating: 0,
      tech: [],
      description: "Capstone design project; conceptual and technical design and implementation of interactive game, integrating custom code and toolkits; teamwork, written and oral communication skills."
    },
    {
      number: "CSE 5913",
      name: "Capstone: Computer Animation",
      rating: 0,
      tech: [],
      description: "Capstone design project: conceptual and technical design and implementation of computer animation incorporating animation elements; teamwork, written and oral communication skills."
    },
    {
      number: "CSE 5914",
      name: "Capstone: Knowledge-Based System",
      rating: 0,
      tech: [],
      description: "Capstone design project; conceptual and technical design; theory and practice of knowledge-based systems; teamwork, written and oral communication skills."
    },
    {
      number: "CSE 5915",
      name: "Capstone: Information Systems",
      rating: 0,
      tech: ["Java"],
      description: "Capstone design project; information system principles: database design methods and tools, indexing, searching, application development, testing, evaluation; teamwork, written and oral communication skills."
    }
];

var courseNames = [];
    
courses.map((item) => (
  courseNames.push(item.number)
));

var courseTypes = [
    {
        type: "CSE Prereq",
        courses: [
        "ENGR 1100",
        "MATH 1151",
        "MATH 1172",
        "PHYS 1250",
        "CSE 2221",
        "ENGR 1181",
        "ENGR 1182"
        ]
    },
    {
        type: "Core",
        courses: [
            "CSE 2221",
            "CSE 2231",
            "CSE 2321",
            "CSE 2331",
            "CSE 2421",
            "CSE 2431",
            "CSE 3231",
            "CSE 3241",
            "CSE 3341",
            "CSE 3421",
            "CSE 3461",
            "CSE 3521",
            "CSE 3541",
            "CSE 3901"
        ]
    },
    {
        type: "Non-Major Core",
        courses: [
            "STAT 3470",
            "MATH 3345",
            "MATH 2568",
            "ECE 2060",
            "ECE 2020",
        ]
    },
    {
        type: "Math & Sci Elective",
        courses: [
            "MATH 2153",
        ]
    },
    {
        type: "Tech Elective",
        courses: [
            "CSE 3231",
            "CSE 3241",
            "CSE 3421",
            "CSE 3461",
            "CSE 3521",
            "CSE 3541",
            "CSE 3901",
            "CSE 4471",
            "CSE 5236",
        ]
    },
    {
        type: "Non-Major",
        courses: [
            "CSE 1222",
            "CSE 1223",
            "CSE 1224",
            "CSE 2122",
            "CSE 2123",
            "CSE 2450",
        ]
    },
    {
        type: "Minimum Graduation Requirements",
        courses: [
            "ENGR 1100",
            "MATH 1151",
            "MATH 1172",
            "PHYS 1250",
            "ENGR 1181",
            "ENGR 1182",
            "CSE 2221",
            "CSE 2231",
            "STAT 3470",
            "CSE 2321",
            "CSE 2331",
            "CSE 2421",
            "ECE 2060",
            "MATH 2568",
            "CSE 2431",
            "CSE 3901",
            "ECE 2020",
            "MATH 3345",
            "CSE 3231",
            "CSE 3241",
            "CSE 3461",
            "CSE 3541",
            "CSE 3341",
            "CSE 3232",
            "CSE 4471",
        ]
    },
    {
      type: "AI",
      courses: [
          "CSE 3521",
      ]
    },
    {
      type: "SWE",
      courses: [
          "CSE 3231",
          "CSE 3232",
          "CSE 5236",
      ]
    },
    {
        type: "All Courses",
        courses: courseNames
    }
];

const ItemTypes = {
  A: 'Prereq',
  B: 'Core',
  C: 'Core Choice',
  D: 'Non-Major Core',
  E: 'Tech Electives',
  F: 'Math/Sci Electives',
  G: 'Non-Credit',
  H: 'GE',
}

// CLASSES
var courseDetails = [
  { name: 'ENGR 1100', type: ItemTypes.A, credit: 1, prereq: [], coreq: []},
  { name: 'ENGR 1181', type: ItemTypes.A, credit: 2, prereq: [], coreq: []},
  { name: 'ENGR 1182', type: ItemTypes.A, credit: 2, prereq: [["ENGR 1181", "ENGR 1281H"]], coreq: []},
  { name: 'ENGR 1281H', type: ItemTypes.A, credit: 5, prereq: [], coreq: []},
  { name: 'ENGR 1282H', type: ItemTypes.A, credit: 3, prereq: [["ENGR 1281H"]], coreq: []},
  { name: 'PHYS 1250', type: ItemTypes.A, credit: 5, prereq: [], coreq: []},
  { name: 'MATH 1151', type: ItemTypes.A, credit: 5, prereq: [], coreq: []},
  { name: 'MATH 1172', type: ItemTypes.A, credit: 5, prereq: [["MATH 1151"]], coreq: []},
  { name: 'CSE 122X', type: ItemTypes.G, credit: 3, prereq: [], coreq: []},
  { name: 'MATH 2568', type: ItemTypes.D, credit: 3, prereq: [["MATH 1172"]], coreq: []},
  { name: 'MATH 3345', type: ItemTypes.D, credit: 3, prereq: [["MATH 1172"], ["CSE 2321"]], coreq: []},
  { name: 'STAT 3470', type: ItemTypes.D, credit: 3, prereq: [["MATH 1172"]], coreq: []},
  { name: 'ECE 2060', type: ItemTypes.D, credit: 3, prereq: [["CSE 122X", "CSE 2221", "ENGR 1281H"], ["MATH 1172"], ["PHYS 1250"], ["ENGR 1182", "ENGR 1282H"]], coreq: []},
  { name: 'ECE 2020', type: ItemTypes.D, credit: 3, prereq: [["ENGR 1182", "ENGR 1282H"]], coreq: [["MATH 1172"], ["PHYS 1250"]]},
  { name: 'CSE 2221', type: ItemTypes.B, credit: 4, prereq: [["ENGR 1281H", "CSE 122X"]], coreq: [["MATH 1151"]]},
  { name: 'CSE 2231', type: ItemTypes.B, credit: 4, prereq: [["CSE 2221"]], coreq: []},
  { name: 'CSE 2321', type: ItemTypes.B, credit: 3, prereq: [["CSE 2122", "CSE 2123", "CSE 2221"], ["MATH 1151"]], coreq: []},
  { name: 'CSE 2331', type: ItemTypes.B, credit: 3, prereq: [["CSE 2231", "CSE 2321"], ["STAT 3470"]], coreq: []},
  { name: 'CSE 2421', type: ItemTypes.B, credit: 4, prereq: [["CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 2431', type: ItemTypes.B, credit: 3, prereq: [["CSE 2421"], ["STAT 3470"]], coreq: []},
  { name: 'CSE 3341', type: ItemTypes.B, credit: 3, prereq: [["CSE 2231"], ["CSE 2331"], ["CSE 2421"], ["CSE 3901"]], coreq: []},
  { name: 'CSE 2501', type: ItemTypes.C, credit: 1, prereq: [["CSE 2123", "CSE 2231"]], coreq: []},
  { name: 'PHILOS 2338', type: ItemTypes.C, credit: 4, prereq: [], coreq: []},
  { name: 'CSE 3231', type: ItemTypes.C, credit: 3, prereq: [["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 3241', type: ItemTypes.C, credit: 3, prereq: [["CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 3421', type: ItemTypes.C, credit: 3, prereq: [["CSE 2231"], ["CSE 2421"], ["ECE 2060"]], coreq: []},
  { name: 'CSE 3461', type: ItemTypes.C, credit: 3, prereq: [["CSE 2421"]], coreq: [["CSE 2431"]]},
  { name: 'CSE 3521', type: ItemTypes.C, credit: 3, prereq: [["CSE 2331"], ["MATH 2568"], ["STAT 3470"]], coreq: []},
  { name: 'CSE 3541', type: ItemTypes.C, credit: 3, prereq: [["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 3901', type: ItemTypes.C, credit: 4, prereq: [["CSE 2231"], ["CSE 2321"], ["CSE 2421"]], coreq: []},
  { name: 'CSE 3902', type: ItemTypes.C, credit: 4, prereq: [["CSE 2231"], ["CSE 2321"], ["CSE 2421"]], coreq: []},
  { name: 'CSE 3903', type: ItemTypes.C, credit: 4, prereq: [["CSE 2231"], ["CSE 2321"], ["CSE 2421"]], coreq: []},
  { name: 'CSE 5911', type: ItemTypes.C, credit: 4, prereq: [["CSE 3231"], ["CSE 2501", "PHILOS 2338"], ["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 5912', type: ItemTypes.C, credit: 4, prereq: [["CSE 3541"], ["CSE 2501", "PHILOS 2338"], ["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 5913', type: ItemTypes.C, credit: 4, prereq: [["CSE 3541"], ["CSE 2501", "PHILOS 2338"], ["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 5914', type: ItemTypes.C, credit: 4, prereq: [["CSE 3521"], ["CSE 2501", "PHILOS 2338"], ["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 5915', type: ItemTypes.C, credit: 4, prereq: [["CSE 3241"], ["CSE 2501", "PHILOS 2338"], ["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 3232', type: ItemTypes.E, credit: 3, prereq: [["CSE 3241", "CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 3244', type: ItemTypes.E, credit: 3, prereq: [["CSE 3241"], ["CSE 2421"]], coreq: []},
  { name: 'CSE 3321', type: ItemTypes.E, credit: 3, prereq: [["CSE 2231"], ["CSE 2331"], ["CSE 2421"], ["MATH 3345"]], coreq: []},
  { name: 'CSE 4251', type: ItemTypes.E, credit: 3, prereq: [["CSE 2123", "CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 4252', type: ItemTypes.E, credit: 3, prereq: [["CSE 2123", "CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 4253', type: ItemTypes.E, credit: 3, prereq: [["CSE 2123", "CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 4254', type: ItemTypes.E, credit: 3, prereq: [["CSE 2123", "CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 4255', type: ItemTypes.E, credit: 3, prereq: [["CSE 2123", "CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 4256', type: ItemTypes.E, credit: 3, prereq: [["CSE 2123", "CSE 2231"], ["CSE 2321"]], coreq: []},
  { name: 'CSE 4471', type: ItemTypes.E, credit: 3, prereq: [["CSE 2231", "CSE 2321"]], coreq: []},
  { name: 'CSE 5236', type: ItemTypes.E, credit: 3, prereq: [["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'CSE 5472', type: ItemTypes.E, credit: 3, prereq: [["CSE 3461", "CSE 4471"], ["CSE 3901", "CSE 3902", "CSE 3903"]], coreq: []},
  { name: 'Writing GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
  { name: 'Arts GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
  { name: 'History GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
  { name: 'Social Sci GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
  { name: 'Diversity GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
  { name: 'Citizenship GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
  { name: 'Choice GE', type: ItemTypes.H, credit: 3, prereq: [], coreq: []},
];

router.get('/deleteClasses', async (req, res) => {
    try {
      const result = await Schemas.Class.deleteMany({});
      console.log(`${result.deletedCount} classes deleted`);
      res.status(200).json({ message: 'All classes deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete all classes' });
    }
});

router.get('/deletePreviewClasses', async (req, res) => {
  try {
    const result = await Schemas.PreviewClass.deleteMany({});
    console.log(`${result.deletedCount} classes deleted`);
    res.status(200).json({ message: 'All classes deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete all classes' });
  }
});

router.get('/deleteClassTypes', async (req, res) => {
  try {
    const result = await Schemas.ClassType.deleteMany({});
    console.log(`${result.deletedCount} class types deleted`);
    res.status(200).json({ message: 'All class types deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete all class types' });
  }
});

router.get('/deleteClassDetails', async (req, res) => {
  try {
    const result = await Schemas.ClassDetail.deleteMany({});
    console.log(`${result.deletedCount} class types deleted`);
    res.status(200).json({ message: 'All class details deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete all class details' });
  }
});

router.get('/addClasses', async (req, res) => {
    try {
        for (var course of courses) {
          const objects = await Schemas.Review.find({ selectInput: course.number }).exec();
          var size = 0;
          var totalDifficulty = 0;
          var x = [];

          for (var object of Array.from(objects)) {
            if (object.selectInput === course.number) {
              totalDifficulty += parseInt(object["difficulty"]);
              size += 1;
            }
          }
        
          var averageRating = (parseFloat(totalDifficulty) / parseFloat(size)).toFixed(2);

          if (averageRating && averageRating !== "NaN") {
            course.rating = averageRating;
          } else {
            course.rating = 0;
          }

          await new Schemas.Class(course).save();
        }

        console.log('Saved successfully!');
        res.end('added');
    } catch(err) {
        console.log(err);
        res.end('not added');
    }
});

router.get('/addPreviewClasses', async (req, res) => {
  try {
      for (var previewCourse of previewCourses) {
        const objects = await Schemas.Review.find({ selectInput: previewCourse.number }).exec();
        var size = 0;
        var totalDifficulty = 0;
        var x = [];

        for (var object of Array.from(objects)) {
          if (object.selectInput === previewCourse.number) {
            totalDifficulty += parseInt(object["difficulty"]);
            size += 1;
          }
        }
      
        var averageRating = (parseFloat(totalDifficulty) / parseFloat(size)).toFixed(2);

        if (averageRating && averageRating !== "NaN") {
          previewCourse.rating = averageRating;
        } else {
          previewCourse.rating = 0;
        }

        await new Schemas.PreviewClass(previewCourse).save();
      }

      console.log('Saved successfully!');
      res.end('added');
  } catch(err) {
      console.log(err);
      res.end('not added');
  }
});

router.get('/addClassTypes', async (req, res) => {
    try {
        for (var courseType of courseTypes) {
          await new Schemas.ClassType(courseType).save();
        }

        console.log('Saved successfully!');
        res.end('added');
    } catch(err) {
        console.log(err);
        res.end('not added');
    }
});

router.get('/addClassDetails', async (req, res) => {
  try {
      for (var courseDetail of courseDetails) {
          await new Schemas.ClassDetail(courseDetail).save();
      }

      console.log('Saved successfully!');
      res.end('added');
  } catch(err) {
      console.log(err);
      res.end('not added');
  }
});

router.get('/getClasses', async (req, res) => {    
  try {
    const objects = await Schemas.Class.find({});
    res.end(JSON.stringify(objects));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
})

router.get('/getPreviewClasses', async (req, res) => {    
  try {
    const objects = await Schemas.PreviewClass.find({});
    res.end(JSON.stringify(objects));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
})

router.get('/getClassTypes', async (req, res) => {    
  try {
    const objects = await Schemas.ClassType.find({});
    res.end(JSON.stringify(objects));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
})

router.get('/getClassDetails', async (req, res) => {    
  try {
    const objects = await Schemas.ClassDetail.find({});
    res.end(JSON.stringify(objects));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
})

router.get('/getReviews', async (req, res) => {
  try {
    const objects = await Schemas.Review.find({});
    res.end(JSON.stringify(objects));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
});

router.post('/post', async (req, res) => {
  if (req.body.difficulty === undefined) {
    req.body.difficulty = "0";
  }

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${month}-${day}-${year}`;

//  var xx = [];

 // for (var object of objects) {
//    xx.push(object["difficulty"]);
//  }
  
  var courseName = req.body.selectInput;


  const newReview = new Schemas.Review({
    selectInput: courseName,
    difficulty: parseInt(req.body.difficulty),
    textInput: req.body.textInput,
    user: req.body.user,
    date: currentDate
  });

  try {
    const savedReview = await newReview.save();
    const objects = await Schemas.Review.find({ selectInput: courseName }).exec();
    var size = 0;
    var totalDifficulty = 0;

    for (var object of objects) {
      totalDifficulty += parseInt(object["difficulty"]);
      size += 1;
    }

    var averageRating = (parseFloat(totalDifficulty) / parseFloat(size)).toFixed(2);
    var x = [totalDifficulty, size, averageRating];
    
    const filter = { number: courseName };
    const update = { $set: { rating: averageRating } };

    await Schemas.Class.updateOne(filter, update);
    await Schemas.PreviewClass.updateOne(filter, update);

    res.redirect('/courses'); 
  } catch (err) {
    console.log(err);
    res.redirect('/courses'); 
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  await new Schemas.User(
    { 
      email: email, 
      password: password ,
      verified: false
    }
  ).save();
});

// Handle the /send-authentication-email route
router.post('/send-authentication-email', (req, res) => {
  const { email } = req.body;

  // Create a nodemailer transport object with your email provider settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: data.USERNAME,
      pass: data.PASSWORD
    },
  });

  // Define the email content
  const verificationLink = `http://localhost:3000/verify/${email}${verificationToken}`;

  const mailOptions = {
    from: data.USERNAME,
    to: email,
    subject: 'Email Verification',
    html: `<p>Please click the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`,
  };

  // Send the authentication email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending authentication email:', error);
      res.status(500).json({ error: 'Failed to send authentication email' });
    } else {
      console.log('Authentication email sent:', info.response);
      res.json({ message: 'Authentication email sent successfully' });
    }
  });
});

router.get('/getVerificationToken', async (req, res) => {
  try {
    var t = "shin.810@osu.edu" + verificationToken;
    res.end(JSON.stringify({token: t}));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
});

router.get('/verifyUser', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Schemas.User.find({ email: email }).exec();

    const filter = { number: email };
    const update = { $set: { verified: true } };

    await Schemas.User.updateOne(filter, update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
});

router.post('/checkEmail', async (req, res) => {
  try {
    const user = await Schemas.User.find({ email: req.body.email }).exec();

    if (user.length > 0) res.status(500).json({ error: 'User already exists' });
    else res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Schemas.User.find(
      { 
        email: req.body.email,
        password: req.body.password 
      }
    ).exec();
      console.log(user);
    if (user.length > 0) {
      currentUser = email;
      res.status(200).json();
    }
    else res.status(500).json({ error: 'Failed to retrieve objects' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
});

router.get('/getCurrentUser', async (req, res) => {
  try {
    res.end(JSON.stringify(currentUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve objects' });
  }
});

module.exports = router;