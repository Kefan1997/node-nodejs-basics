const parseArgs = () => {
  const args = process.argv.slice(2);
  const res = [];

  for (let i = 0; i < args.length; i = i + 2) {
    const propName = args[i].substring(2);
    const value = args[i + 1];

    res.push(`${propName} is ${value}`);
  }

  console.log(res.join(', '));
};

parseArgs();
