class IPService {
  constructor(ipData) {
    this.ipData = ipData;
  }

  async getIPInfo(userIp) {
    try {
      const match = this.ipData.find((row) => {
        const from = row.from;
        const to = row.to;
        const userIpNum = this.ipToNumber(userIp);
        return userIpNum >= from && userIpNum <= to;
      });

      if (match) {
        return {
          ip: userIp,
          country: match.country,
          range: `${match.from} - ${match.to}`,
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("An error occurred while retrieving IP information.");
    }
  }

  ipToNumber = (ip) => {
    const octets = ip.split('.');
    const ipNumber = (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + (octets[3] >>> 0);
    return ipNumber;
  };
}

module.exports = IPService;
