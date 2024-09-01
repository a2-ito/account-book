import { IAccountRequestModel, ICategoryResponseModel } from '@/features/accounts/models'

// import { ENDPOINT } from '@/constants'

export namespace AccountRepository {
  /**
   * カテゴリ情報取得
   */
  export async function getCategories() {
   // Promise<HttpResponse<ICategoryResponseModel>> {
    // const res = await fetchRequest(`${ENDPOINT}/api/categories`, 'GET', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    const res = await fetch(`/api/categories`)
    const json = await res.json()
    return json.categories
  }

  /**
   * 利用費目一覧取得
   */
  export async function getAccounts() {
    // const res = await fetchRequest(`${ENDPOINT}/api/categories`, 'GET', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    const res = await fetch(`/api/accounts`)
    const json = await res.json()
    return json.accounts
  }

  /**
   * 利用費目送信
   */
  // export async function postAccount(body: IAccountRequestModel): Promise<HttpResponse<void>> {
  export async function postAccount(body: IAccountRequestModel) {
    //const { data, status, statusText } = await fetchRequest(`/api/accounts`, 'POST', {
    const res = await fetch(`/api/accounts`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    // return data.account
    const json = await res.json()
    return json.account
  }
}
