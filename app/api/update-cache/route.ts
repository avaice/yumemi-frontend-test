import { NextResponse } from 'next/server'
import { createResponse } from '../../_utils/createResponse'

export async function GET(_request: Request) {
  for (let i = 1; i <= 47; i++) {
    fetch(
      'https://yumemi-frontend-test-mu.vercel.app/api/population?prefCode=' + i
    )
  }

  return NextResponse.json(createResponse({ status: 'ok', data: null }))
}
