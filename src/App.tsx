import useForm from './Formagic/useForm.ts'
import FormProvider from './Formagic/component/FormProvider.tsx'
import useField from './Formagic/useField.ts'
// import useWatch from './Formagic/useWatch.tsx'
import useFormState from './Formagic/useFormState.tsx'
import { Button, Form, Input, Radio, Checkbox } from 'antd'

const InputControl = ({ name, validate }: { name: string; validate?: any }) => {
  const { value, onChange } = useField({ name, validate })
  return <Input type="text" value={value} onChange={onChange} />
}

const RadioControl = ({ name }: { name: string }) => {
  const { value, onChange } = useField({ name })
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={'1'}>考试</Radio>
      <Radio value={'2'}>问卷</Radio>
      <Radio value={'3'}>测评</Radio>
      <Radio value={'4'}>预约</Radio>
    </Radio.Group>
  )
}

const CheckboxControl = ({ name }: { name: string }) => {
  const options = [
    { label: '单行文本', value: 'TextField' },
    { label: '多行文本', value: 'TextArea' },
    { label: '单项选择', value: 'RadioButton' },
    { label: '多项选择', value: 'CheckBox' },
  ]
  const { value, onChange } = useField({ name })
  return <Checkbox.Group options={options} value={value} onChange={onChange} />
}
//
// const InputObject = () => {
//   const { value, onChange } = useField({ name: 'info' })
//   return (
//     <div>
//       <button
//         onClick={() => {
//           onChange({
//             user: 'cat',
//             apple: 'iphone14',
//           })
//         }}
//       >
//         change object1
//       </button>
//       <button
//         onClick={() => {
//           onChange({
//             user: 'zzzz',
//             apple: 'iphone15',
//           })
//         }}
//       >
//         change object2
//       </button>
//       <p>{JSON.stringify(value)}</p>
//     </div>
//   )
// }
//
// const Watch = ({ name }: { name: string }) => {
//   const value = useWatch({ name })
//   console.log(`watch: ${name}`, value)
//   return <div>watch</div>
// }
const StateChange = () => {
  const { dirtyFields, isDirty } = useFormState()
  console.log('dirtyFields', dirtyFields)
  console.log('isDirty', isDirty)
  return (
    <div>
      <div>isDirty:</div>
      <div>{isDirty ? 'true' : 'false'}</div>
      <div>dirtyFields:</div>
      <div>{JSON.stringify(dirtyFields, null, 2)}</div>
    </div>
  )
}

function App() {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      username: 'zzh',
      email: '123123@qq.com',
      scene: '1',
      field: ['TextField', 'RadioButton'],
    },
  })

  const onFinish = () => {
    alert(JSON.stringify(form.control._formValues))
  }

  return (
    <FormProvider value={{ ...form }}>
      <div style={{ margin: '100px auto', maxWidth: 600 }}>
        <Form onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Username" name="username">
            <InputControl name={'username'} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <InputControl name={'email'} />
          </Form.Item>
          <Form.Item label="Scene" name="scene">
            <RadioControl name={'scene'} />
          </Form.Item>
          <Form.Item label="Field" name="field">
            <CheckboxControl name={'field'} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <StateChange />
          </Form.Item>
        </Form>
      </div>
    </FormProvider>
  )
}

export default App
