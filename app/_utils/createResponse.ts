type ResultOk<T> = {
  status: 'ok'
  data: T
}
type ResultError = {
  status: 'error'
  reason: string
}

export const createResponse = <T>(result: ResultOk<T> | ResultError) => {
  return result
}
