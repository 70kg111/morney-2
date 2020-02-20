type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdAt?: Date
}

type Tag = {
  id: string
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated'  //success 表示成功，duplicated 表示name重复
  update: (id: string, name: string) => 'success' | 'duplicated' | 'Not Found'
  remove: (id: string) => boolean
  save: () => void
}

interface Window {
  tagList: Tag[]
  findTag: (id: string) => Tag | undefined
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: TagListModel['update']
}