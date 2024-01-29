const parseEnv = () => {
    const pref = 'RSS_'

    for (const key in process.env) {
        if(key.startsWith(pref)) {
            console.log(`${key}=${process.env[key]}`)
        }
    }
};

parseEnv();