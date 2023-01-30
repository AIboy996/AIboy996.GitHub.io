---
tags:
- PyScript
---
# html form + PyScript
<html>

<head>
<script defer src="https://pyscript.net/alpha/pyscript.js"></script>
</head>

<body>
<p>本页面内容参考项目：<a href="https://github.com/amrrs/html-forms-pyscript">amrrs/html-forms-pyscript</a></p>
<br>
<hr>
<form onsubmit="return false">
    <label for="name">Form:</label><br>
    <input type="text" id="name" name="name" value="name" style="border: 1px solid rgb(12, 13, 14);"><br>

    <select name="countries" id="countries">
        <option value="India">India</option>
        <option value="Germany">Germany</option>
        <option value="Netherlands">Netherlands</option>
    </select>

    <input pys-onClick="sub" type="submit" id="btn-form" value="submit">


</form>

<p>Output:</p>
<p id='output'></p>
<py-script>

def sub(*args,**kwargs):
    result_place = Element('output')
    result_place.write(f"{Element('name').value} is a good human from {Element('countries').value}")

</py-script>

</body>

</html>