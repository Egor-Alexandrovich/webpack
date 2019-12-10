export async function getIpinfo() {
    try {
        const token = '6a14e36dfd78ed';
        const response = await fetch(`https://ipinfo.io/json?token=${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
