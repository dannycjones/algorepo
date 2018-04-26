import test from 'ava';
import interpreter from '../server/interpreter';

test('Addition', t => {
  let result = interpreter.process('3 + 2');
  t.is(result, 5);
});

test('Subtraction', t => {
  let result = interpreter.process('7 - 2');
  t.is(result, 5);
});

test('Multiplication', t => {
  let result = interpreter.process('3 * 2');
  t.is(result, 6);
});

test('Division', t => {
  let result = interpreter.process('14 / 4');
  t.is(result, 3.5);
});

test('Brackets and precedence', t => {
  let result;

  result = interpreter.process('(3 + 2) * 6');
  t.is(result, 30);

  result = interpreter.process('3 + (2 * 6)');
  t.is(result, 15);

  result = interpreter.process('3 + 4 * 6');
  t.is(result, 27);
});

test('Resolve variables', t => {
  t.is(interpreter.process('x', { x: 5 }), 5);
  t.is(interpreter.process('y * 2', { y: 7 }), 14);
});

test('Power function', t => {
  let result = interpreter.process('$power(2, 4) + 3');
  t.is(result, 19);
});

test('Exponent function', t => {
  let result;

  result = interpreter.process('$exp(5)');
  t.is(result, Math.exp(5));

  result = interpreter.process('$exp(0)');
  t.is(result, Math.exp(0));
});

test('Product function', t => {
  let result;

  result = interpreter.process('$product(myList)', { myList: [2, 5, 8] });
  t.is(result, 80);

  result = interpreter.process('$product(myList)', { myList: [2, -5, 8] });
  t.is(result, -80);

  result = interpreter.process('$product(myList)', { myList: [] });
  t.is(result, 1, 'Empty product');
});

test('Sum function', t => {
  let result;
  
  result = interpreter.process('$sum(myList)', { myList: [2, 5, 8] });
  t.is(result, 15);
  
  result = interpreter.process('$sum(myList)', { myList: [2, -5, 8] });
  t.is(result, 5);
  
  result = interpreter.process('$sum(myList)', { myList: [] });
  t.is(result, 0, 'Empty sum');
});

test('LogB function', t => {
  let result;
  
  result = interpreter.process('$logb(2, 8)');
  t.is(result, 3);
  
  result = interpreter.process('$logb(4, 16)');
  t.is(result, 2);
});

test('Log function', t => {
  let result;
  
  result = interpreter.process('$log(8)');
  t.is(result, Math.log(8));
  
  result = interpreter.process('$log(1234)');
  t.is(result, Math.log(1234));
});

test('Pi constant', t => {
  let result;
  
  result = interpreter.process('($pi / 3)');
  t.is(result, Math.PI / 3);
  
  result = interpreter.process('$log(1234)');
  t.is(result, Math.log(1234));
});

test('Euler\'s constant', t => {
  let result;
  
  result = interpreter.process('$power($e, 1)');
  t.is(result, Math.E);
});
