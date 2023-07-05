class IPController {
  constructor(ipService) {
    this.ipService = ipService;
  }

  async getIPInfo(req, res) {
    try {
      const userIp = req.ip;
      const ipInfo = await this.ipService.getIPInfo(userIp);

      if (ipInfo) {
        res.json(ipInfo);
      } else {
        res.status(404).json({
          error: "IP not found in database.",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving IP information.",
      });
    }
  }
}

module.exports = IPController;
