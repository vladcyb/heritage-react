class Config {
  public readonly baseUrl: string

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.baseUrl = 'http://localhost:5000'
    } else {
      this.baseUrl = ''
    }
  }
}

export default new Config()
