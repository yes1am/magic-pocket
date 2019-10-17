const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function SPromise(fn) {
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if(this.state === PENDING) {
      this.state = RESOLVED;
      this.value = value;
      this.resolvedCallbacks.map(cb => cb(this.value))
    }
  }
  
  function reject(value) {
    if(this.state === PENDING) {
      this.state = REJECTED;
      this.value = value;
      this.rejectedCallbacks.map(cb => cb(this.value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

SPromise.prototype.then = function(onFulFilled,onRejected) {
  onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
  onRejected = typeof onRejected === 'function' 
  ? onRejected 
  : r => {
    throw r;
  }

  if(this.state === PENDING) {
    this.resolvedCallbacks.push(onFulFilled)
    this.rejectedCallbacks.push(onRejected)
  }

  if(this.state === RESOLVED) {
    onFulFilled(this.value)
  }

  if(this.state === REJECTED) {
    onRejected(this.value)
  }
}

new SPromise((resolve, reject) => {
  console.log('2')
  setTimeout(() => {
    console.log('3')
    resolve(1)
  }, 0)
}).then(value => {
  console.log('1')
  console.log(value)
})

// new Promise((resolve, reject) => {
//   resolve('123');
//   reject('error');
// }).then(res => {

// }).catch(err => {

// })