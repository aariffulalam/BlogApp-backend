const isValidPassword = (password) => {
    const re = /^(?=.*\d).{8,}$/
    return re.test(password)
}

module.exports = {isValidPassword}