const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function SPromise (fn) {
  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  // 使用箭头函数，确保 this 是 SPromise 实例
  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = RESOLVED
      this.value = value
      this.resolvedCallbacks.map(cb => cb(this.value))
    }
  }

  const reject = (value) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.value = value
      this.rejectedCallbacks.map(cb => cb(this.value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

SPromise.prototype.then = function (onFulFilled, onRejected) {
  onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
  onRejected = typeof onRejected === 'function'
    ? onRejected
    : r => {
      throw r
    }

  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onFulFilled)
    this.rejectedCallbacks.push(onRejected)
  }

  if (this.state === RESOLVED) {
    onFulFilled(this.value)
  }

  if (this.state === REJECTED) {
    onRejected(this.value)
  }
}

new SPromise((resolve, reject) => {
  console.log('start')
  setTimeout(() => {
    resolve(1)
  // reject(0)
  }, 2000)
}).then(value => {
  console.log(`resolve ${value}`)
}, err => {
  console.log(`reject ${err}`)
})
console.log('end')

// // new Promise((resolve, reject) => {
// //   resolve('123');
// //   reject('error');
// // }).then(res => {

// // }).catch(err => {

// // })

// function MyPromise (executor) {
//   let self = this
//   self.value = undefined
//   self.reason = undefined
//   self.status = 'pending' // 默认promise状态是pending
//   function resolve (value) {
//     if (self.status === 'pending') { // 保证状态一旦变更，不能再次修改
//       self.value = value
//       self.status = 'resolved' // 成功状态
//     }
//   }
//   function reject (reason) {
//     if (self.status === 'pending') {
//       self.reason = reason
//       self.status = 'rejected' // 失败状态
//     }
//   }
//   executor(resolve, reject) // 因为会立即执行这个执行器函数
// }

// MyPromise.prototype.then = function (onFulfilled, onRejected) {
//   let self = this
//   if (self.status === 'resolved') {
//     onFulfilled(self.value)
//   }
//   if (self.status === 'rejected') {
//     onRejected(self.reason)
//   }
// }

// new MyPromise(function (resolve, reject) {
//   console.log('start')
//   resolve('data2')
// }).then(v => {
//   console.log('success ' + v)
// }
// )
// console.log('end')
