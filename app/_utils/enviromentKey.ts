if (!process.env.RESAS_API_KEY || !process.env.RESAS_API_ENDPOINT) {
  throw new Error(
    '環境変数が適切に設定されていません。.env.sampleを参考に設定してください。'
  )
}
export const ENVIROMENT_KEY = {
  RESAS_API_KEY: process.env.RESAS_API_KEY,
  RESAS_API_ENDPOINT: process.env.RESAS_API_ENDPOINT,
} as const
