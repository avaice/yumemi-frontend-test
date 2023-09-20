type ResultOk<T> = {
  status: 'ok'
  data: T
}
type ResultError = {
  status: 'error'
  reason: string
}

//レスポンスの型を保証するための関数
export const createResponse = <T>(result: ResultOk<T> | ResultError) => {
  return result
}
