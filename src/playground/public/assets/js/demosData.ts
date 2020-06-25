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
