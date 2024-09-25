function genName(msg) {
    let res = (msg?.from.first_name + " " + msg?.from.last_name).replace("undefined", "")
    if (res.length <= 0) return msg?.from.first_name;
    return res;
} 

module.exports = {
    genName,
}