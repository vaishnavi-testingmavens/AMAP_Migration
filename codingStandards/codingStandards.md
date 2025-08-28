\
]'**_Coding Standards_**

# Table of Contents

[**CODING STANDARDS**](#_Toc139626720)

[Introduction](#introduction)

[Types](#types)

[References](#references)

[Objects](#objects)

[Arrays](#arrays)

[Destructuring](#destructuring)

[Strings](#strings)

[Functions](#functions)

[Arrow Functions](#arrow-functions)

[Variables](#variables)

[Hoisting](#hoisting)

[Comparison Operators & Equality](#comparison)

[Blocks](#blocks)

[Control Statements](#control-statements)

[Comments](#comments)

[Whitespace](#whitespace)

[Commas](#commas)

[Semicolons](#semicolons)

[Type Casting & Coercion](#type_casting)

[Naming Conventions](#naming-conventions)

[Testing](#testing)

[Best practices](#best-practices)

## Introduction

➡️ **1.1 UI test automation is built using Playwright framework using Typescript. The code must be formatted with vs code inbuilt 'formatt document' option prior to committing it to GitLab**

➡️ **1.2 All functions are written with async and hence the expecting step/test must call this function with an await**

e.g. fn -> async checkData(){ .. }
**_Standard NOT to be used_** ❌ 

const result = checkData();

**_Standard to be used_** ✅ 

const result = await checkData(); :right:


➡️ **1.3 Asynchronous functions should not return a statement that contains await keyword. Instead, the function should return a promise that will be resolved by await keyword when called.**

/\*\*

\* Standard to be used.

\*/

let getClass = function (\$element) {

return await \$element.getAttribute(\"class\")

};

/\*\*

\* Standard to be used.

\*/

let getClass = function (\$element) {

return \$element.getAttribute(\"class\")

};

let elementClass = await getClass(\$loginField);

## Types

➡️ **2.1 Primitives: When you access a primitive type you work directly on its value.**

-   string

-   number

-   boolean

-   null

-   undefined

-   symbol

const foo = 1;

let bar = foo;

bar = 9;

console.log(foo, bar); // =\> 1, 9

**2.2 Complex: When you access a complex type you work on a reference to
its value.**

-   object

-   array

-   function

const foo = \[1, 2\];

const bar = foo;

bar\[0\] = 9;

console.log(foo\[0\], bar\[0\]); // =\> 9, 9

## References

**3.1 Use const for all of your references; Avoid using var (ECMAScript
6 (ES 2015)).**

**Why? This ensures that you can't reassign your references, which can
lead to bugs and difficult to comprehend code.**

/\*\*

\* Standard not to be used.

\*/

var a = 1;

var b = 2;

/\*\*

\* Standard to be used.

\*/

const a = 1;

const b = 2;

**3.2 If you must reassign references, use let instead of var.**

**Why? let is block-scoped rather than function-scoped like var.**

/\*\*

\* Standard not to be used.

\*/

var count = 1;

if (true) {

count += 1;

}

/\*\*

\* Standard to be used.

\*/

let count = 1;

if (true) {

count += 1;

}

## Objects

**4.1 Use the literal syntax for object creation.**

/\*\*

\* Standard not to be used.

\*/

const item = new Object();

/\*\*

\* Standard to be used.

\*/

const item = {};

**4.2 Use object method shorthand- The object method shorthand is a
syntax feature in JavaScript that allows you to define methods inside an
object using a shorter, more concise syntax. It was introduced in
ECMAScript 2015 (ES6) as part of the language\'s overall improvement in
terms of readability and brevity.**

/\*\*

\* Standard not to be used.

\*/

const atom = {

value: 1,

addValue: function (value) {

return atom.value + value;

},

};

/\*\*

\* Standard to be used.

\*/

const atom = {

value: 1,

addValue(value) {

return atom.value + value;

},

};

**4.3 If at least one property in an object requires quotes, quote all
properties.**

/\*\*

\* Standard not to be used.

\*/

let object = {

prop: \"value\",

\"long property\": \"value\"

}

/\*\*

\* Standard to be used.

\*/

let object = {

\"prop\": \"value\",

\"long property\": \"value\",

}

**4.4 Add a comma to the last items of a multiline object/array, so when
another one is added, Git doesn\'t recognize the existing one as new**

/\*\*

\* Standard not to be used.

\*/

let array = \[

\"item1\",

\"item2\"

\]

// good

let array = \[

\"item1\",

\"item2\",

\]

## Arrays

**5.1 Use the literal syntax for array creation.**

/\*\*

\* Standard not to be used.

\*/

const items = new Array();

/\*\*

\* Standard to be used.

\*/

const items = \[\];

**5.2 Use array spreads \... to copy arrays.**

/\*\*

\* Standard not to be used.

\*/

const itemsCopy = \[\];

for (let i = 0; i \< items.length; i++) {

itemsCopy\[i\] = items\[i\];

}

/\*\*

\* Standard to be used.

\*/

const itemsCopy = \[\...items\];

**5.3 Use line breaks after open and before close array brackets if an
array has multiple lines.**

/\*\*

\* Standard not to be used.

\*/

const objectInArray = \[{

id: 1,

}, {

id: 2,

}\];

const numberInArray = \[

1, 2,

\];

/\*\*

\* Standard to be used.

\*/

const objectInArray = \[

{

id: 1,

},

{

id: 2,

},

\];

## Destructuring

**6.1 Use object destructuring when accessing and using multiple
properties of an object.**

**Why? Destructuring saves you from creating temporary references for
those properties.**

/\*\*

\* Standard not to be used.

\*/

function getFullName(user) {

const firstName = user.firstName;

const lastName = user.lastName;

return \`\${firstName} \${lastName}\`;

}

/\*\*

\* Standard to be used.

\*/

function getFullName(user) {

const { firstName, lastName } = user;

return \`\${firstName} \${lastName}\`;

}

**6.2 Use array destructuring.**

const arr = \[1, 2, 3, 4\];

/\*\*

\* Standard not to be used.

\*/

const first = arr\[0\];

const second = arr\[1\];

/\*\*

\* Standard to be used.

\*/

const \[first, second\] = arr;

## Strings

**7.1 Use single quotes \'\' for strings.**

/\*\*

\* Standard not to be used.

\*/

const name = \"Capt. Janeway\";

/\*\*

\* Standard not to be used- template literals should contain
interpolation \*or newlines

\*/

const name = \`Capt. Janeway\`;

/\*\*

\* Standard to be used.

\*/

const name = \'Capt. Janeway\';

**7.2 Strings that cause the line to go over 100 characters should not
be written across multiple lines using string concatenation.**

**Why? Broken strings are painful to work with and make code less
searchable.**

/\*\*

\* Standard not to be used.

\*/

const errorMessage = \'This is a super long error that was thrown
because \' +

\'of Batman. When you stop to think about how Batman had anything to do
\' +

\'with this, you would get nowhere fast.\';

/\*\*

\* Standard to be used.

\*/

const errorMessage = \'This is a super long error that was thrown
because of Batman. When you stop to think about how Batman had anything
to do with this, you would get nowhere fast.\';

**7.3 When programmatically building up strings, use template strings
instead of concatenation.**

**Why? Template strings give you a readable, concise syntax with proper
newlines and string interpolation features.**

/\*\*

\* Standard not to be used.

\*/

function sayHi(name) {

return \'How are you, \' + name + \'?\';

}

/\*\*

\* Standard not to be used.

\*/

function sayHi(name) {

return \[\'How are you, \', name, \'?\'\].join();

}

/\*\*

\* Standard not to be used.

\*/

function sayHi(name) {

return \`How are you, \${ name }?\`;

}

/\*\*

\* Standard to be used.

\*/

function sayHi(name) {

return \`How are you, \${name}?\`;

}

**7.4 Backticks should be only used for constructing strings and strings
that contain both single and double quotes.**

/\*\*

\* Standard not to be used.

\*/

let myString = \`some string\`;

/\*\*

\* Standard to be used.

\*/

let myString1 = \`some \${variable}\`;

let myString2 = \`\'some\' \"string\"\`;

## Functions

**8.1 Use default parameter syntax rather than mutating function
arguments**.

/\*\*

\* Standard not to be used.

\*/

function handleThings(opts) {

// No! We shouldn't mutate function arguments.

// Double bad: if opts is falsy it\'ll be set to an object which may

// be what you want but it can introduce subtle bugs.

opts = opts \|\| {};

// \...

}

/\*\*

\* Standard to be used.

\*/

function handleThings(opts = {}) {

// \...

}

**8.2 Spacing in a function signature.**

**Why? Consistency is good, and you shouldn't have to add or remove
space when adding or removing a name.**

/\*\*

\* Standard not to be used.

\*/

const f = function(){};

const g = function (){};

/\*\*

\* Standard to be used.

\*/

const x = function() {};

**8.3 Functions with multiline signatures, or invocations, should be
indented just like every other multiline list in this guide: with each
item on a line by itself, with a trailing comma on the last item.**

/\*\*

\* Standard not to be used.

\*/

function foo(bar,

baz,

quux) {

// \...

}

/\*\*

\* Standard to be used.

\*/

function foo(

bar,

baz,

quux,

) {

// \...

}

/\*\*

\* Standard not to be used.

\*/

console.log(foo,

bar,

baz);

/\*\*

\* Standard to be used.

\*/

console.log(

foo,

bar,

baz,

);

## Arrow Functions

**9.1 When you must use an anonymous function (as when passing an inline
callback), use arrow function notation.**

**Why? It creates a version of the function that executes in this
context, which is usually what you want, and is a more concise syntax.**

**Why not? If you have a fairly complicated function, you might move
that logic out into its own named function expression.**

/\*\*

\* Standard not to be used.

\*/

\[1, 2, 3\].map(function (x) {

const y = x + 1;

return x \* y;

});

/\*\*

\* Standard to be used.

\*/

\[1, 2, 3\].map((x) =\> {

const y = x + 1;

return x \* y;

});

**9.2 If your function takes a single argument and doesn't use braces,
omit the parentheses. Otherwise, always include parentheses around
arguments for clarity and consistency. Note: it is also acceptable to
always use parentheses, in which case use the "always" option for
eslint.**

/\*\*

\* Standard not to be used.

\*/

\[1, 2, 3\].map((x) =\> x \* x);

/\*\*

\* Standard to be used.

\*/

\[1, 2, 3\].map(x =\> x \* x);

/\*\*

\* Standard to be used.

\*/

\[1, 2, 3\].map(number =\> (

\`A long string with the \${number}. It's so long that we don't want it
to take up space on the .map line!\`

));

/\*\*

\* Standard not to be used.

\*/

\[1, 2, 3\].map(x =\> {

const y = x + 1;

return x \* y;

});

/\*\*

\* Standard to be used.

\*/

\[1, 2, 3\].map((x) =\> {

const y = x + 1;

return x \* y;

});

**9.3 Enforce the location of arrow function bodies with implicit
returns.**

/\*\*

\* Standard not to be used.

\*/

foo =\>

bar;

foo =\>

(bar);

/\*\*

\* Standard to be used.

\*/

foo =\> bar;

foo =\> (bar);

foo =\> (

bar

)

## Variables

**10.1 Group all your const and then group all your let.**

**Why? This is helpful when later on you might need to assign a variable
depending on one of the previous assigned variables.**

/\*\*

\* Standard not to be used.

\*/

let i, len, dragonball,

items = getItems(),

goSportsTeam = true;

/\*\*

\* Standard not to be used.

\*/

let i;

const items = getItems();

let dragonball;

const goSportsTeam = true;

let len;

/\*\*

\* Standard to be used.

\*/

const goSportsTeam = true;

const items = getItems();

let dragonball;

let i;

let length;

**10.2 Disallow unused variables.**

**Why? Variables that are declared and not used anywhere in the code are
most likely an error due to incomplete refactoring. Such variables take
up space in the code and can lead to confusion by readers.**

/\*\*

\* Standard not to be used.

\*/

let some_unused_var = 42;

// Write-only variables are not considered as used.

let y = 10;

y = 5;

// A read for a modification of itself is not considered as used.

let z = 0;

z = z + 1;

// Unused function arguments.

function getX(x, y) {

return x;

}

/\*\*

\* Standard to be used.

\*/

function getXPlusY(x, y) {

return x + y;

}

let x = 1;

let y = a + 2;

alert(getXPlusY(x, y));

// \'type\' is ignored even if unused because it has a rest property
sibling.

// This is a form of extracting an object that omits the specified keys.

let { type, \...coords } = data;

// \'coords\' is now the \'data\' object without its \'type\' property.

## Hoisting

**11.1 var declarations get hoisted to the top of their closest
enclosing function scope, their assignment does not.  const and let
declarations are blessed with a new concept called Temporal Dead Zones
(TDZ). It's important to know why typeof is no longer safe.**

//We know this wouldn't work (assuming there

// is no notDefined global variable)

function example() {

console.log(notDefined); // =\> throws a ReferenceError

}

// creating a variable declaration after you

// reference the variable will work due to

// variable hoisting. Note: the assignment

// value of \`true\` is not hoisted.

function example() {

console.log(declaredButNotAssigned); // =\> undefined

let declaredButNotAssigned = true;

}

// the interpreter is hoisting the variable

// declaration to the top of the scope,

// which means our example could be rewritten as:

function example() {

let declaredButNotAssigned;

console.log(declaredButNotAssigned); // =\> undefined

declaredButNotAssigned = true;

}

// using const and let

function example() {

console.log(declaredButNotAssigned); // =\> throws a ReferenceError

console.log(typeof declaredButNotAssigned); // =\> throws a
ReferenceError

const declaredButNotAssigned = true;

}

**11.2 Function declarations hoist their name and the function body.**

function example() {

superPower(); // =\> Flying

function superPower() {

console.log(\'Flying\');

}

}

## Comparison

**12.1 Use === and !== over == and !=.**

**12.2 Conditional statements such as the if statement evaluate their
expression using coercion with the ToBooleanabstract method and always
follow these simple rules:**

-   Objects evaluate to true

-   Undefined evaluates to false

-   Null evaluates to false

-   Booleans evaluate to the value of the boolean

-   Numbers evaluate to false if +0, -0, or NaN, otherwise true

-   Strings evaluate to false if an empty string \'\', otherwise true

if (\[0\] && \[\]) {

// true

// an array (even an empty one) is an object, objects will evaluate to
true

}

**12.3 Use shortcuts for booleans, but explicit comparisons for strings
and numbers.**

/\*\*

\* Standard not to be used.

\*/

if (isValid === true) {

// \...

}

/\*\*

\* Standard to be used.

\*/

if (isValid) {

// \...

}

/\*\*

\* Standard not to be used.

\*/

if (name) {

// \...

}

/\*\*

\* Standard to be used.

\*/

if (name !== \'\') {

// \...

}

/\*\*

\* Standard not to be used.

\*/

if (collection.length) {

// \...

}

/\*\*

\* Standard to be used.

\*/

if (collection.length \> 0) {

// \...

}

**12.4 Ternaries should not be nested and generally be single line
expressions.**

/\*\*

\* Standard not to be used.

\*/

const foo = maybe1 \> maybe2

? \"bar\"

: value1 \> value2 ? \"baz\" : null;

// split into 2 separated ternary expressions

const maybeNull = value1 \> value2 ? \'baz\' : null;

/\*\*

\* Standard to be used.

\*/

const foo = maybe1 \> maybe2

? \'bar\'

: maybeNull;

/\*\*

\* Standard to be used.

\*/

const foo = maybe1 \> maybe2 ? \'bar\' : maybeNull;

**12.5 Avoid unneeded ternary statements.**

/\*\*

\* Standard not to be used.

\*/

const foo = a ? a : b;

const bar = c ? true : false;

const baz = c ? false : true;

/\*\*

\* Standard to be used.

\*/

const foo = a \|\| b;

const bar = !!c;

const baz = !c;

**12.6 When mixing operators, enclose them in parentheses. The standard
arithmetic operators (+, -, \*, & /) are the only exception since their
precedence is broadly understood.**

**Why? This improves readability and clarifies the developer's
intention.**

/\*\*

\* Standard not to be used.

\*/

const foo = a && b \< 0 \|\| c \> 0 \|\| d + 1 === 0;

/\*\*

\* Standard not to be used.

\*/

const bar = a \*\* b - 5 % d;

/\*\*

\* Standard not to be used.

\*/

// one may be confused into thinking (a \|\| b) && c

if (a \|\| b && c) {

return d;

}

/\*\*

\* Standard to be used.

\*/

const foo = (a && b \< 0) \|\| c \> 0 \|\| (d + 1 === 0);

/\*\*

\* Standard to be used.

\*/

const bar = (a \*\* b) - (5 % d);

/\*\*

\* Standard to be used.

\*/

if (a \|\| (b && c)) {

return d;

}

/\*\*

\* Standard to be used.

\*/

const bar = a + b / c \* d;

## Blocks

**13.1 Use braces with all multi-line blocks.**

/\*\*

\* Standard not to be used.

\*/

if (test)

return false;

/\*\*

\* Standard to be used.

\*/

if (test) return false;

/\*\*

\* Standard to be used.

\*/

if (test) {

return false;

}

/\*\*

\* Standard not to be used.

\*/

function foo() { return false; }

/\*\*

\* Standard to be used.

\*/

function bar() {

return false;

}

**13.2 If you're using multi-line blocks with if and else, put else on
the same line as your if block's closing brace.**

/\*\*

\* Standard not to be used.

\*/

if (test) {

thing1();

thing2();

}

else {

thing3();

}

/\*\*

\* Standard to be used.

\*/

if (test) {

thing1();

thing2();

} else {

thing3();

}

**13.3 If an if block always executes a return statement, the
subsequent else block is unnecessary. A return in an else if block
following an if block that contains a return can be separated into
multiple if blocks.**

/\*\*

\* Standard not to be used.

\*/

function foo() {

if (x) {

return x;

} else {

return y;

}

}

/\*\*

\* Standard not to be used.

\*/

function cats() {

if (x) {

return x;

} else if (y) {

return y;

}

}

/\*\*

\* Standard not to be used.

\*/

function dogs() {

if (x) {

return x;

} else {

if (y) {

return y;

}

}

}

/\*\*

\* Standard to be used.

\*/

function foo() {

if (x) {

return x;

}

return y;

}

/\*\*

\* Standard to be used.

\*/

function cats() {

if (x) {

return x;

}

if (y) {

return y;

}

}

// good

function dogs(x) {

if (x) {

if (z) {

return y;

}

} else {

return z;

}

}

## Control Statements

**14.1 In case your control statement (if, while etc.) gets too long or
exceeds the maximum line length, each (grouped) condition could be put
into a new line. The logical operator should begin the line.**

**Why? Requiring operators at the beginning of the line keeps the
operators aligned and follows a pattern similar to method chaining. This
also improves readability by making it easier to visually follow complex
logic.**

/\*\*

\* Standard not to be used.

\*/

if ((foo === 123 \|\| bar === \'abc\') &&
doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {

thing1();

}

/\*\*

\* Standard not to be used.

\*/

if (foo === 123 &&

bar === \'abc\') {

thing1();

}

/\*\*

\* Standard not to be used.

\*/

if (foo === 123

&& bar === \'abc\') {

thing1();

}

/\*\*

\* Standard not to be used.

\*/

if (

foo === 123 &&

bar === \'abc\'

) {

thing1();

}

/\*\*

\* Standard to be used.

\*/

if (

foo === 123

&& bar === \'abc\'

) {

thing1();

}

/\*\*

\* Standard to be used.

\*/

if (

(foo === 123 \|\| bar === \'abc\')

&& doesItLookGoodWhenItBecomesThatLong()

&& isThisReallyHappening()

) {

thing1();

}

/\*\*

\* Standard to be used.

\*/

if (foo === 123 && bar === \'abc\') {

thing1();

}

## Comments

**15.1 Use /\*\* \... \*/ for multi-line comments.**

// bad

// make() returns a new element

// based on the passed in tag name

//

// \@param {String} tag

// \@return {Element} element

function make(tag) {

// \...

return element;

}

/\*\*

\* Standard to be used.

\*/

/\*\*

\* make() returns a new element

\* based on the passed-in tag name

\*/

function make(tag) {

// \...

return element;

}

**15.2 Use // for single line comments. Place single line comments on a
newline above the subject of the comment. Put an empty line before the
comment unless it's on the first line of a block.**

/\*\*

\* Standard not to be used.

\*/

const active = true; // is current tab

/\*\*

\* Standard to be used.

\*/

// is current tab

const active = true;

/\*\*

\* Standard not to be used.

\*/

function getType() {

console.log(\'fetching type\...\');

// set the default type to \'no type\'

const type = this.type \|\| \'no type\';

return type;

}

/\*\*

\* Standard to be used.

\*/

function getType() {

console.log(\'fetching type\...\');

// set the default type to \'no type\'

const type = this.type \|\| \'no type\';

return type;

}

/\*\*

\* Standard to be used.

\*/

function getType() {

// set the default type to \'no type\'

const type = this.type \|\| \'no type\';

return type;

}

**15.3 Start all comments with a space to make it easier to read.**

/\*\*

\* Standard not to be used.

\*/

//is current tab

const active = true;

/\*\*

\* Standard to be used.

\*/

// is current tab

const active = true;

/\*\*

\* Standard not to be used.

\*/

/\*\*

\*make() returns a new element

\*based on the passed-in tag name

\*/

function make(tag) {

// \...

return element;

}

/\*\*

\* Standard not to be used.

\*/

/\*\*

\* make() returns a new element

\* based on the passed-in tag name

\*/

function make(tag) {

// \...

return element;

}

**15.4 Prefixing your comments with FIXME or TODO helps other developers
quickly understand if you're pointing out a problem that needs to be
revisited, or if you're suggesting a solution to the problem that needs
to be implemented. These are different than regular comments because
they are actionable.**

The actions are:

FIXME: \-- need to figure this out or

TODO: \-- need to implement.

**15.5 Use // FIXME: to annotate problems.**

class Calculator extends Abacus {

constructor() {

super();

// FIXME: shouldn't use a global here

total = 0;

}

}

**15.6 Use // TODO: to annotate solutions to problems.**

class Calculator extends Abacus {

constructor() {

super();

// TODO: total should be configurable by an options param

this.total = 0;

}

}

## Whitespace

**16.1 Use hard tabs (\'tab\' character) set to 4 spaces.**

/\*\*

\* Standard not to be used.

\*/

function bar() {

∙let name;

}

/\*\*

\* Standard to be used.

\*/

function baz() {

∙∙∙∙let name;

}

**16.2 Place 1 space before the leading brace.**

/\*\*

\* Standard not to be used.

\*/

function test(){

console.log(\'test\');

}

/\*\*

\* Standard to be used.

\*/

function test() {

console.log(\'test\');

}

/\*\*

\* Standard not to be used.

\*/

dog.set(\'attr\',{

age: \'1 year\',

breed: \'Bernese Mountain Dog\',

});

/\*\*

\* Standard to be used.

\*/

dog.set(\'attr\', {

age: \'1 year\',

breed: \'Bernese Mountain Dog\',

});

**16.3 Place 1 space before the opening parenthesis in control
statements (if, while etc.). Place no space between the argument list
and the function name in function calls and declarations.**

/\*\*

\* Standard not to be used.

\*/

if(isJedi) {

fight ();

}

/\*\*

\* Standard to be used.

\*/

if (isJedi) {

fight();

}

/\*\*

\* Standard not to be used.

\*/

function fight () {

console.log (\'Swooosh!\');

}

/\*\*

\* Standard to be used.

\*/

function fight() {

console.log(\'Swooosh!\');

}

**16.4 Set off operators with spaces.**

/\*\*

\* Standard not to be used.

\*/

const x=y+5;

/\*\*

\* Standard to be used.

\*/

const x = y + 5;

**16.5 Use indentation when making long method chains (more than 2
method chains). Use a leading dot, which emphasizes that the line is a
method call, not a new statement.**

/\*\*

\* Standard not to be used.

\*/

\$(\'#items\').find(\'.selected\').highlight().end().find(\'.open\').updateCount();

/\*\*

\* Standard not to be used.

\*/

\$(\'#items\').

find(\'.selected\').

highlight().

end().

find(\'.open\').

updateCount();

/\*\*

\* Standard to be used.

\*/

\$(\'#items\')

.find(\'.selected\')

.highlight()

.end()

.find(\'.open\')

.updateCount();

**16.6 Leave a blank line after blocks and before the next statement.**

/\*\*

\* Standard not to be used.

\*/

if (foo) {

return bar;

}

return baz;

/\*\*

\* Standard to be used.

\*/

if (foo) {

return bar;

}

return baz;

/\*\*

\* Standard not to be used.

\*/

const obj = {

foo() {

},

bar() {

},

};

return obj;

/\*\*

\* Standard to be used.

\*/

const obj = {

foo() {

},

bar() {

},

};

return obj;

/\*\*

\* Standard not to be used.

\*/

const arr = \[

function foo() {

},

function bar() {

},

\];

return arr;

/\*\*

\* Standard to be used.

\*/

const arr = \[

function foo() {

},

function bar() {

},

\];

return arr;

**16.7 Do not pad your blocks with blank lines.**

/\*\*

\* Standard not to be used.

\*/

function bar() {

console.log(foo);

}

/\*\*

\* Standard not to be used.

\*/

if (baz) {

console.log(qux);

} else {

console.log(foo);

}

/\*\*

\* Standard not to be used.

\*/

class Foo {

constructor(bar) {

this.bar = bar;

}

}

/\*\*

\* Standard to be used.

\*/

function bar() {

console.log(foo);

}

/\*\*

\* Standard not to be used.

\*/

if (baz) {

console.log(qux);

} else {

console.log(foo);

}

**16.8 Do not use multiple blank lines to pad your code.**

/\*\*

\* Standard not to be used.

\*/

class Person {

constructor(fullName, email, birthday) {

this.fullName = fullName;

this.email = email;

this.setAge(birthday);

}

setAge(birthday) {

const today = new Date();

const age = this.getAge(today, birthday);

this.age = age;

}

getAge(today, birthday) {

// ..

}

}

/\*\*

\* Standard to be used.

\*/

class Person {

constructor(fullName, email, birthday) {

this.fullName = fullName;

this.email = email;

this.setAge(birthday);

}

setAge(birthday) {

const today = new Date();

const age = getAge(today, birthday);

this.age = age;

}

getAge(today, birthday) {

// ..

}

}

**16.9 Do not add spaces inside parentheses.**

/\*\*

\* Standard not to be used.

\*/

function bar( foo ) {

return foo;

}

/\*\*

\* Standard to be used.

\*/

function bar(foo) {

return foo;

}

/\*\*

\* Standard not to be used.

\*/

if ( foo ) {

console.log(foo);

}

/\*\*

\* Standard to be used.

\*/

if (foo) {

console.log(foo);

}

**16.10 Do not add spaces inside brackets.**

/\*\*

\* Standard not to be used.

\*/

const foo = \[ 1, 2, 3 \];

console.log(foo\[ 0 \]);

/\*\*

\* Standard to be used.

\*/

const foo = \[1, 2, 3\];

console.log(foo\[0\]);

**16.11 Avoid having lines of code that are longer than 100 characters
(including whitespace). Note: per above, long strings are exempt from
this rule, and should not be broken up.**

**Why? This ensures readability and maintainability.**

/\*\*

\* Standard not to be used.

\*/

const foo = jsonData && jsonData.foo && jsonData.foo.bar &&
jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux &&
jsonData.foo.bar.baz.quux.xyzzy;

/\*\*

\* Standard not to be used.

\*/

\$.ajax({ method: \'POST\', url: \'https://airbnb.com/\', data: { name:
\'John\' } }).done(() =\> console.log(\'Congratulations!\')).fail(() =\>
console.log(\'You have failed this city.\'));

/\*\*

\* Standard to be used.

\*/

const foo = jsonData

&& jsonData.foo

&& jsonData.foo.bar

&& jsonData.foo.bar.baz

&& jsonData.foo.bar.baz.quux

&& jsonData.foo.bar.baz.quux.xyzzy;

/\*\*

\* Standard to be used.

\*/

\$.ajax({

method: \'POST\',

url: \'https://airbnb.com/\',

data: { name: \'John\' },

})

.done(() =\> console.log(\'Congratulations!\'))

.fail(() =\> console.log(\'You have failed this city.\'));

**16.12 Avoid spaces before commas and require a space after commas.**

/\*\*

\* Standard not to be used.

\*/

var foo = 1,bar = 2;

var arr = \[1 , 2\];

/\*\*

\* Standard to be used.

\*/

var foo = 1, bar = 2;

var arr = \[1, 2\];

**16.13 Enforce spacing inside of computed property brackets.**

/\*\*

\* Standard not to be used.

\*/

obj\[foo \]

obj\[ \'foo\'\]

var x = {\[ b \]: a}

obj\[foo\[ bar \]\]

/\*\*

\* Standard to be used.

\*/

obj\[foo\]

obj\[\'foo\'\]

var x = { \[b\]: a }

obj\[foo\[bar\]\]

**16.14 Avoid spaces between functions and their invocations.**

/\*\*

\* Standard not to be used.

\*/

func ();

func

();

/\*\*

\* Standard to be used.

\*/

func();

**16.15 Enforce spacing between keys and values in object literal
properties.**

/\*\*

\* Standard not to be used.

\*/

let obj = { \"foo\" : 42 };

let obj2 = { \"foo\":42 };

/\*\*

\* Standard to be used.

\*/

let obj = { \"foo\": 42 };

**16.16 Avoid trailing spaces at the end of lines and/or strings.**

/\*\*

\* Standard not to be used.

\*/

let a = \' string\'

let b = \'string \'

let c = \'string\'∙∙ // \<- spaces

/\*\*

\* Standard to be used.

\*/

let a = \'string\'

**16.17 Avoid multiple empty lines and only allow one newline at the end
of files.**

/\*\*

\* Standard not to be used.

\*/

var x = 1;

var y = 2;

/\*\*

\* Standard to be used.

\*/

var x = 1;

var y = 2;

**16.18 Avoid more than 1 space between words in strings**

/\*\*

\* Standard not to be used.

\*/

it(\'spec 1\'),

/\*\*

\* Standard to be used.

\*/

it(\'spec 1\'),

## Commas

**17.1 Leading commas: Nope.**

/\*\*

\* Standard not to be used.

\*/

const story = \[

once

, upon

, aTime

\];

/\*\*

\* Standard to be used.

\*/

const story = \[

once,

upon,

aTime,

\];

## Semicolons

**18.1 Yup.**

**Why? When JavaScript encounters a line break without a semicolon, it
uses a set of rules called Automatic Semicolon Insertion to determine
whether or not it should regard that line break as the end of a
statement, and (as the name implies) place a semicolon into your code
before the line break if it thinks so. ASI contains a few eccentric
behaviors, though, and your code will break if JavaScript misinterprets
your line break. These rules will become more complicated as new
features become a part of JavaScript. Explicitly terminating your
statements and configuring your linter to catch missing semicolons will
help prevent you from encountering issues.**

/\*\*

\* Standard not to be used. - raises exception

\*/

const luke = {}

const leia = {}

\[luke, leia\].forEach(jedi =\> jedi.father = \'vader\')

/\*\*

\* Standard not to be used. - raises exception

\*/

const reaction = \"No! That's impossible!\"

(async function meanwhileOnTheFalcon() {

// handle \`leia\`, \`lando\`, \`chewie\`, \`r2\`, \`c3p0\`

// \...

}())

// bad - returns \`undefined\` instead of the value on the next line -
always happens when \`return\` is on a line by itself because of ASI!

function foo() {

return

\'search your feelings, you know it to be foo\'

}

/\*\*

\* Standard to be used.

\*/

const luke = {};

const leia = {};

\[luke, leia\].forEach((jedi) =\> {

jedi.father = \'vader\';

});

/\*\*

\* Standard to be used.

\*/

const reaction = \"No! That's impossible!\";

(async function meanwhileOnTheFalcon() {

// handle \`leia\`, \`lando\`, \`chewie\`, \`r2\`, \`c3p0\`

// \...

}());

/\*\*

\* Standard to be used.

\*/

function foo() {

return \'search your feelings, you know it to be foo\';

}

## Type_Casting

**19.1 Perform type coercion at the beginning of the statement.**

**19.2 Booleans:**

const age = 0;

/\*\*

\* Standard not to be used.

\*/

const hasAge = new Boolean(age);

/\*\*

\* Standard to be used.

\*/

const hasAge = Boolean(age);

/\*\*

\* Standard to be used.

\*/

const hasAge = !!age;

**19.3 Strings**

this.reviewScore = 9;

/\*\*

\* Standard to be used.

\*/

const totalScore = String(this.reviewScore);

/\*\*

\* Standard not to be used.

\*/

const totalScore = new String(this.reviewScore); // typeof totalScore is
\"object\" not \"string\"

/\*\*

\* Standard not to be used.

\*/

const totalScore = this.reviewScore + \'\'; // invokes
this.reviewScore.valueOf()

/\*\*

\* Standard not to be used.

\*/

const totalScore = this.reviewScore.toString(); // isn't guaranteed to
return a string

## Naming Conventions

**20.1 Avoid single letter names. Be descriptive with your naming. The
exception of the rule can be indexes in loops**

/\*\*

\* Standard not to be used.

\*/

function q() {

// \...

}

/\*\*

\* Standard to be used.

\*/

function query() {

// \...

}

**20.2 Use camelCase when naming objects, functions, and instances.**

/\*\*

\* Standard not to be used.

\*/

const OBJEcttsssss = {};

const this_is_my_object = {};

function c() {}

/\*\*

\* Standard to be used.

\*/

const thisIsMyObject = {};

function thisIsMyFunction() {}

**20.3 Use PascalCase only when naming constructors or classes.**

/\*\*

\* Standard not to be used.

\*/

function user(options) {

this.name = options.name;

}

const bad = new user({

name: \'nope\',

});

/\*\*

\* Standard to be used.

\*/

class User {

constructor(options) {

this.name = options.name;

}

}

const good = new User({

name: \'yup\',

});

**20.4 Acronyms and initialisms should always be all uppercased, or all
lowercased.**

**Why? Names are for readability, not to appease a computer algorithm.**

/\*\*

\* Standard not to be used.

\*/

import SmsContainer from \'./containers/SmsContainer\';

/\*\*

\* Standard not to be used.

\*/

const HttpRequests = \[

// \...

\];

/\*\*

\* Standard to be used.

\*/

import smsContainer from \'./containers/SMSContainer\';

/\*\*

\* Standard to be used.

\*/

const httpRequests = \[

// \...

\];

/\*\*

\* Standard to be used.

\*/

const requestsHTTP = \[

// \...

\];

**20.5 Use \$ symbol for ElementFinders and \$\$ for
ElementArrayFinders.**

**Why? It helps visually distinguish elements from other variables and
methods used in tests, and often reduces the amount of time spent for
debugging.**

/\*\*

\* Standard not to be used.

\*/

this.loginButton = \$(\"\[id=\'loginForm:loginLink\'\]\");

/\*\*

\* Standard not to be used.

\*/

let messages = element.all(by.repeater(\'msg in messages\'));

/\*\*

\* Standard to be used.

\*/

this.\$loginButton = \$(\"\[id=\'loginForm:loginLink\'\]\");

/\*\*

\* Standard to be used.

\*/

let \$\$messages = element.all(by.repeater(\'msg in messages\'));

## Testing

**21.1 Yup!**

function foo() {

return true;

}

**21.2 No, but seriously:**

**Strive to write many small pure functions, and minimize where
mutations occur. Be cautious about stubs and mocks - they can make your
tests more brittle. Whenever you fix a bug, write a regression test. A
bug fixed without a regression test is almost certainly going to break
again in the future.**

## Best practices

**22.1 Page objects\' methods should not have assertions**

this.login = async (username, password) =\> {

await sendKeys(this.\$usernameInput, username);

await sendKeys(this.\$passwordInput, password);

await click(this.\$loginButton);

/\*\*

\* Standard not to be used.

\*/

expect(this.\$welcomeMessage.getText()).toBe(\'Welcome User\')

};

**22.2 Assertions must have on failure explanations.**

/\*\*

\* Standard to be used.

\*/

expect(

\$welcomeMessage.getText()

).toBe(

\'Welcome User\',

\'Expect text of \$welcomeMessage element to be \"Welcome User\"\'

)

**22.3 On failure explanations should be explicit and concise.**

/\*\*

\* Standard not to be used.

\*/

expect(\$welcomeMessage.isPresent()).toBe(true, 'user is logged in')

/\*\*

\* Standard to be used.

\*/

expect(\$welcomeMessage.isPresent()).toBe(true, 'welcome message is
present')

**22.4 Page object's method should wait for the page to be fully loaded
before exiting.**

this.login = async (username, password) =\> {

await sendKeys(this.\$usernameInput, username);

await sendKeys(this.\$passwordInput, password);

await click(this.\$loginButton);

await browser.wait(

ExpectedConditions.stalenessOf(this.\$loaderAnimation),

10000,

\"Error message\"

)

}

**22.5 CSS is the preferred locator strategy. Although, use of other
locators is not limited when necessary.**

**Why? It helps to keep your code neat.**

/\*\*

\* Standard not to be used.

\*/

let \$elem = element(by.xpath(\'//div\[@id=\"someElem\"\]\'));

/\*\*

\* Standard to be used.

\*/

let \$elem = \$(\'#someElem\');

/\*\*

\* Standard to be used.

\*/

let \$elem = element(by.xpath(\'.//div\[@class=\"k-widget\" or
\@class=\"content\"\]\'));

**22.6 Avoid using browser.sleep(). Use browser.wait() instead, unless
it\'s explicitly needed**

**Why? Any timeout slows down execution of the tests, whereas it
doesn\'t guarantee the page is loaded fully after certain period of
inactivity.**

/\*\*

\* Standard not to be used.

\*/

await browser.sleep(5000);

/\*\*

\* Standard to be used.

\*/

await browser.wait(

ExpectedConditions.visibilityOf(\$element),

5000,

\"Error message\"

)
