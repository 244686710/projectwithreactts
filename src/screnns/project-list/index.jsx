
import React, {useEffect, useState} from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import qs from 'qs'
import {clearnObject, useMount, useDebounce} from 'utils'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 2000)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])
  useMount(() => {
    fetch(apiUrl + '/users').then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}/>
      <List list={list} users={users} />
    </div>
  )
}