interface Demo {
  title: string;
  code: string;
}

const demos: { [key: string]: Demo } = {
  demo10: {
    title: 'Simple Example',
    code: `ask {
  {a: 5+3, b:9}
}
`,
  },

  demo20: {
    title: 'Factorial',
    code: `ask {
  const factorial: int(int) = fun(n:int):int {
    if (n:lessThan(2)) {
      return n
    }

    n:multiply(factorial(n:minus(1)))
  }

  5:factorial
}`,
  },

  demo21: {
    title: 'Factorial (nicer operators)',
    code: `ask {
  const factorial: int(int) = fun(n:int):int {
    if (n < 2) {
      return n
    }

    n * factorial(n - 1)
  }

  5:factorial
}`,
  },

  demo26: {
    title: 'Facebook likes',
    code: `// Below is a complete solution for a 6kyu Codewars task: 
// https://www.codewars.com/kata/5266876b8f4bf2da9b000362
ask {
  const likes = fun(names: array(string)): string {
    const len = names:length
    if (len == 0) {
      return 'no one likes it';
    }
    if (len == 1) {
      return concat(names[0], ' likes it');
    }
    if (len == 2) {
      return concat(names[0], ' and ', names[1], ' like it');
    }
    if (len == 3) {
      return concat(names[0], ', ', names[1], ' and ', names[2], ' like it');
    }
    return concat(names[0], ', ', names[1], ' and ', len-2, ' others like it');
    
  }

  [
    likes([]), 
    likes(['Peter']), 
    likes(['Jacob', 'Alex']), 
    likes(['Max', 'John', 'Mark']), 
    likes(['Alex', 'Jacob', 'Mark', 'Max'])
  ]
}
`,
  },

  demo30: {
    title: 'Query',
    code: `ask {
  query {
    firstName
    lastName
  }
}`,
  },

  demo40: {
    title: 'Nested Query',
    code: `ask {
  query {
    firstName
    lastName
    parents {
      firstName
      lastName
    } 
  }
}`,
  },

  demo50: {
    title: 'Query with modifiers',
    code: `ask {
  query {
    fullName: firstName :concat(' ', lastName) :toUpperCase
  }
}`,
  },
};
