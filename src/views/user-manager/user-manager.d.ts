export interface userData {
  id: number,
  user_id: number,
  username: string,
  supplier_id: number,
  email: string,
  status: boolean,
  supplier_name: string,
  last_login_time: string,
  status_text: string
}

export interface logtable {
  operator: string,
  create_time: string,
  type_text: string,
  remark: string
}

export interface bottomType {
  label: string,
  click: Boolean,
  value: string
}

export interface searchData {
  status: number,
  selectType: string,
  inputText: string
}

export interface rule {
  username: string,
  email: string,
  user_id: number
}

export interface labelArr {
  label: string,
  value: string
}
