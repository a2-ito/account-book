"use client";
import { useEffect, useCallback, useState } from "react";
import { AccountRepository } from "@/features/accounts/providers";
import { ICategoryResponseModel, IAccountRequestModel, IAccountResponseModel } from '@/features/accounts/models';
import dayjs from "dayjs";
import { signOut } from 'next-auth/react';

export default function HomeView() {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState("1");
  const [typeId, setTypeId] = useState("2");
  const [memo, setMemo] = useState<string>('')

  const [categories, setCategories] = useState<ICategoryResponseModel[]>([])
  const [accounts, setAccounts] = useState<IAccountResponseModel[]>([])
  // const [categoryMap, setCategoryMap] = useState(new Map())

  useEffect(() => {
    async function initialize() {
      const res1 = await AccountRepository.getCategories()
      setCategories(res1)
      // setCategoryMap(new Map(res1))
      const res2 = await AccountRepository.getAccounts()
      setAccounts(res2)
    }
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  }

  const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeId(e.target.value);
  }

  const changeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  }

  const clickSubmit = useCallback(
    async () => {
      const req: IAccountRequestModel = {
        categoryId: Number(categoryId),
        typeId: Number(typeId),
        amount: Number(amount),
        memo: memo,
      }
      console.log(req)
      const newAccount = await AccountRepository.postAccount(req)
      setAccounts([...accounts, newAccount])
    }, [categoryId, typeId, amount, memo, accounts])

  function getCategoryName(id: number)  {
    const c = categories.find((v) => v.id === id)
    return c?.name || '未分類'
  }

  return (
    <main>
      <div>
        <h1 className="text-xl font-bold text-black-400">家計簿アプリ</h1>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-last-name"
            >
              金額
              <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                必須
              </text>
            </label>
          </div>

          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={amount}
              onChange={changeAmount}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-first-name"
              >
                分類
                <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                  必須
                </text>
              </label>
          </div>
          <div className="md:w-2/3">
          <select
            name="username"
            onChange={changeCategory}
            className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
          >
            {categories.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-first-name"
              >
                支出/収入
                <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                  必須
                </text>
              </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="radio"
              value="2"
              onChange={changeType}
              checked={typeId === "2"}
            />
              支出
            <input
              type="radio"
              value="1"
              onChange={changeType}
              checked={typeId === "1"}
            />
              収入
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-first-name"
            >
              メモ
              <text className="text-white bg-slate-300 font-normal text-sm ml-2 p-0.5 rounded-md">
                任意
              </text>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text" value={memo} onChange={changeMemo}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="group relative h-8 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition"
            onClick={clickSubmit}
          >
            送信
          </button>
        </div>

        <div className="whitespace-nowrap overflow-auto h-[500px] w-[50%] mt-[100px] top-0">
          <table className="table-auto">
            <thead>
                <tr className="bg-gray-200">
                  <th>ID</th>
                  <th>費用</th>
                  <th>支出/収入</th>
                  <th>分類</th>
                  <th>利用日</th>
                </tr>
                {accounts.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 sticky left-0 z-[2] bg-slate-100 border ">
                      {item.id}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.amount}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.typeId === 1 ? '収入' : '支出'}
                    </td>
                    <td className="px-4 py-2 border">
                      {getCategoryName(item.categoryId)}
                    </td>
                    <td className="px-4 py-2 border">
                      {dayjs(item.dateOfUse).format("YYYY/MM/DD")}
                    </td>
                  </tr>
                ))}
            </thead>
          </table>
        </div>

      </div>
      <div>
        <button
          type="button"
          className="group relative h-8 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition"
          onClick={() => signOut()}
        >ログアウト</button>
      </div>

      </main>
  )
}
