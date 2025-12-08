export type TutorialSection = {
  title: string
  summary: string
  checklist: string[]
  topics?: string[]
  example?: {
    title: string
    language?: string
    code: string
  }
  resources?: Array<{
    title: string
    url: string
  }>
}

export type Tutorial = {
  id: string
  title: string
  description: string
  language: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  sections: TutorialSection[]
}

export const tutorials: Tutorial[] = [
  {
    id: "python-basics",
    title: "Python Basics",
    description: "Start coding with Python from scratch. Learn syntax, variables, control flow, and functions the Programiz way.",
    language: "Python",
    level: "Beginner",
    duration: "60 min",
    sections: [
      {
        title: "Set up Python on your machine",
        summary: "Install Python, choose an editor, and get a REPL ready for quick experiments.",
        checklist: [
          "Download the latest Python 3 release",
          "Add python to your system PATH",
          "Install a code editor like VS Code or PyCharm",
        ],
        topics: [
          "Using python.org to grab installers",
          "Working with the interactive REPL vs. script files",
          "Verifying installations from the terminal"
        ],
        example: {
          title: "Verify your Python install",
          language: "python",
          code: [
            "# check python version",
            "python --version",
            "",
            "# launch the interactive shell",
            "python",
            ">>> print('Hello, Programiz-style world!')",
          ].join('\n'),
        },
        resources: [
          { title: "Download Python", url: "https://www.python.org/downloads/" },
          { title: "VS Code Python extension", url: "https://marketplace.visualstudio.com/items?itemName=ms-python.python" }
        ]
      },
      {
        title: "Learn core language building blocks",
        summary: "Understand variables, data types, input/output, and simple calculations.",
        checklist: [
          "Declare and update variables using numbers and strings",
          "Collect user input with input() and display it",
          "Perform arithmetic and comparison operations",
        ],
        topics: [
          "Primitive data types (int, float, str, bool)",
          "String interpolation with f-strings",
          "Getting comfortable with Python's dynamic typing"
        ],
        example: {
          title: "Mini calculator",
          language: "python",
          code: [
            "name = input('What is your name? ')",
            "number = float(input('Pick any number: '))",
            "",
            "double = number * 2",
            "square = number ** 2",
            "",
            "print(f'Hi {name}! Twice your number is {double}.')",
            "print(f'The square of your number is {square}.')",
          ].join('\n'),
        },
        resources: [
          { title: "Programiz: Python Variables", url: "https://www.programiz.com/python-programming/variables" },
          { title: "Programiz: Python Operators", url: "https://www.programiz.com/python-programming/operators" }
        ]
      },
      {
        title: "Control program execution",
        summary: "Use conditionals and loops to add logic and repetition to your scripts.",
        checklist: [
          "Practice if/elif/else decision making",
          "Use while loops for repeated prompts",
          "Iterate over lists with for loops",
        ],
        topics: [
          "Truthiness and indentation rules",
          "Loop control statements (break, continue)",
          "Iterating over ranges vs. collections"
        ],
        example: {
          title: "Guess the number",
          language: "python",
          code: [
            "secret = 7",
            "guess = None",
            "",
            "while guess != secret:",
            "    guess = int(input('Guess a number between 1 and 10: '))",
            "",
            "    if guess < secret:",
            "        print('Too low!')",
            "    elif guess > secret:",
            "        print('Too high!')",
            "    else:",
            "        print('You got it!')",
          ].join('\n'),
        },
        resources: [
          { title: "Programiz: Python if...else", url: "https://www.programiz.com/python-programming/if-elif-else" },
          { title: "Programiz: Python for Loop", url: "https://www.programiz.com/python-programming/for-loop" }
        ]
      },
      {
        title: "Write reusable functions",
        summary: "Encapsulate behavior with functions and understand scope and return values.",
        checklist: [
          "Define functions with parameters and default values",
          "Return results and capture them",
          "Break a simple script into small reusable helpers",
        ],
        topics: [
          "Function parameters vs. arguments",
          "Return values vs. printing",
          "Docstrings and type hints"
        ],
        example: {
          title: "Reusable temperature converter",
          language: "python",
          code: [
            "def celsius_to_fahrenheit(celsius: float) -> float:",
            "    return (celsius * 9 / 5) + 32",
            "",
            "def fahrenheit_to_celsius(fahrenheit: float) -> float:",
            "    return (fahrenheit - 32) * 5 / 9",
            "",
            "temp_c = float(input('Temperature in C: '))",
            "print(f\"{temp_c}C = {celsius_to_fahrenheit(temp_c):.1f}F\")",
          ].join('\n'),
        },
        resources: [
          { title: "Programiz: Python Functions", url: "https://www.programiz.com/python-programming/function" }
        ]
      },
    ],
  },
  {
    id: "python-intermediate",
    title: "Python Intermediate",
    description: "Dive deeper with data structures, modules, and error handling just like structured Programiz tracks.",
    language: "Python",
    level: "Intermediate",
    duration: "75 min",
    sections: [
      {
        title: "Work fluently with collections",
        summary: "Manipulate lists, tuples, sets, and dictionaries to manage data.",
        checklist: [
          "Slice and modify lists",
          "Map relationships with dictionaries",
          "Use sets to deduplicate data",
        ],
        topics: [
          "Choosing between list vs. tuple",
          "Dictionary comprehensions",
          "Set operations: union, intersection, difference"
        ],
        example: {
          title: "Counting word frequency",
          language: "python",
          code: [
            "text = 'programiz makes python basics easy'",
            "words = text.split()",
            "",
            "frequency = {}",
            "for word in words:",
            "    frequency[word] = frequency.get(word, 0) + 1",
            "",
            "print(frequency)",
          ].join('\n'),
        }
      },
      {
        title: "Organize code with modules and packages",
        summary: "Split programs into modules and reuse functions across files.",
        checklist: [
          "Create a module with helper functions",
          "Import using absolute and relative syntax",
          "Package related modules with __init__.py",
        ],
        topics: [
          "Python import system overview",
          "When to reach for packages",
          "Avoiding circular imports"
        ],
        resources: [
          { title: "Programiz: Python Modules", url: "https://www.programiz.com/python-programming/modules" }
        ]
      },
      {
        title: "Handle errors gracefully",
        summary: "Catch exceptions, raise your own, and ensure clean-up logic always runs.",
        checklist: [
          "Wrap risky code with try/except",
          "Raise custom exceptions with context",
          "Use finally blocks and context managers",
        ],
        topics: [
          "Built-in exception hierarchy",
          "Custom exception classes",
          "Using contextlib for safety"
        ],
        example: {
          title: "Safe division helper",
          language: "python",
          code: [
            "def safe_divide(a: float, b: float) -> float:",
            "    try:",
            "        return a / b",
            "    except ZeroDivisionError as error:",
            "        raise ValueError('Denominator must not be zero') from error",
            "",
            "print(safe_divide(8, 2))",
            "print(safe_divide(5, 0))",
          ].join('\n'),
        }
      },
      {
        title: "Read and write files",
        summary: "Persist data by working with text and JSON files.",
        checklist: [
          "Open files safely with the with keyword",
          "Parse JSON using python's json module",
          "Build a small script that stores and retrieves data",
        ],
        topics: [
          "Relative vs. absolute file paths",
          "Encoding considerations",
          "Operating system safe file handling"
        ],
        example: {
          title: "Store todos in JSON",
          language: "python",
          code: [
            "import json",
            "",
            "todos = ['learn python', 'practice loops', 'build a portfolio project']",
            "",
            "with open('todos.json', 'w', encoding='utf-8') as file:",
            "    json.dump(todos, file, indent=2)",
            "",
            "print('Todos saved!')",
          ].join('\n'),
        }
      },
    ],
  },
  {
    id: "python-advanced",
    title: "Python Advanced",
    description: "Master high-level Python concepts including OOP, generators, and async workflows.",
    language: "Python",
    level: "Advanced",
    duration: "90 min",
    sections: [
      {
        title: "Embrace object-oriented design",
        summary: "Build classes, leverage inheritance, and craft reusable object hierarchies.",
        checklist: [
          "Define classes with dunder methods",
          "Use inheritance to share behavior",
          "Apply dataclasses for concise models",
        ],
        topics: [
          "Encapsulation and data modeling",
          "Method overriding",
          "When to use dataclasses vs. attrs"
        ],
        example: {
          title: "Simple course enrollment system",
          language: "python",
          code: [
            "from dataclasses import dataclass",
            "",
            "@dataclass",
            "class Course:",
            "    title: str",
            "    level: str",
            "",
            "class Learner:",
            "    def __init__(self, name: str):",
            "        self.name = name",
            "        self.courses = []",
            "",
            "    def enroll(self, course: Course):",
            "        self.courses.append(course)",
            "",
            "python_course = Course('Python Basics', 'Beginner')",
            "learner = Learner('Riya')",
            "learner.enroll(python_course)",
            "",
            "print(learner.courses)",
          ].join('\n'),
        }
      },
      {
        title: "Write efficient iterators",
        summary: "Produce data lazily with generators and understand iter tools.",
        checklist: [
          "Create generator functions and expressions",
          "Use itertools to combine sequences",
          "Profile memory usage of eager vs lazy code",
        ],
        topics: [
          "Generator expressions vs. list comprehensions",
          "iterator protocol (__iter__, __next__)",
          "itertools recipes"
        ],
        resources: [
          { title: "Programiz: Python Generators", url: "https://www.programiz.com/python-programming/generator" }
        ]
      },
      {
        title: "Conquer asynchronous programming",
        summary: "Understand async/await and build responsive programs with asyncio.",
        checklist: [
          "Create async functions and await tasks",
          "Schedule concurrent work with asyncio.gather",
          "Handle timeouts and cancellation",
        ],
        topics: [
          "Event loop fundamentals",
          "Awaitable objects",
          "Error handling in async flows"
        ],
        example: {
          title: "Gather multiple web requests",
          language: "python",
          code: [
            "import asyncio",
            "import httpx",
            "",
            "async def fetch_status(url: str) -> int:",
            "    async with httpx.AsyncClient() as client:",
            "        response = await client.get(url)",
            "        return response.status_code",
            "",
            "async def main():",
            "    urls = ['https://httpbin.org/delay/1', 'https://httpbin.org/get']",
            "    results = await asyncio.gather(*(fetch_status(url) for url in urls))",
            "    print(results)",
            "",
            "asyncio.run(main())",
          ].join('\n'),
        }
      },
      {
        title: "Package and distribute projects",
        summary: "Prepare production-ready packages with virtual environments and publishing workflows.",
        checklist: [
          "Structure a project with src layout",
          "Create a pyproject.toml with metadata",
          "Publish to PyPI using build and twine",
        ],
        topics: [
          "Virtual environments (venv, pipenv, poetry)",
          "Semantic versioning",
          "Uploading securely to repositories"
        ],
        resources: [
          { title: "Python Packaging User Guide", url: "https://packaging.python.org/en/latest/tutorials/packaging-projects/" }
        ]
      },
    ],
  },
]

export const findTutorialById = (id: string) => tutorials.find((tutorial) => tutorial.id === id)
