import "./styles.css";

/**
 * ルール
 * 元のHTMLを書き換えてはいけません。
 * jQueryその他フレームワークの使用は禁止とします。
 * 多少HTML/CSSの知識が必要です。分からない方は随時質問してください。
 */

/**
 * generate element for display source code
 * @returns {Element}
 */
function sourceHtml() {
  const html = document.body;
  const div = document.createElement("div");
  const pre = document.createElement("pre");
  pre.innerText = html.innerHTML;
  pre.className = "sources-code";
  div.append(pre);
  return div;
}
const sources = document.getElementById("sources");
sources.append(sourceHtml());

/**
 * A1: カルーセル表示されている画像のファイル名を全て、配列に格納する関数
 */
function practice01() {
  const result = getImageFileName();
  console.log(result);
}
/**
 * 画像のファイル名をresultに格納する
 * @returns {string[]} 画像ファイル名を返す
 */
function getImageFileName() {
  const result = [];
  const carouselNodes = document.querySelectorAll(".carousel-item");

  let i = 0;
  while (carouselNodes.length > i) {
    const imgNode = carouselNodes[i].querySelector("img");
    const imgNames = imgNode.src.split("/");
    result.push(imgNames[imgNames.length - 1]);
    i++;
  }
  return result;
}

/**
 * A2: FirstName, LastName, Emailをプロパティにもつuserオブジェクトを作成する関数
 */
function practice02() {
  const theads = getTheadNode();
  let tbodys = getTbody();
  tbodys = judgeConnect(tbodys);
  const result = generateResult(theads, tbodys);
  console.log(result);
}

/**
 * テーブルの見出しを配列として取得する
 * @returns {string[]} テーブルの見出しを配列として戻す
 */
function getTheadNode() {
  const theadNodes = document.querySelectorAll("table.table thead tr th");
  const theads = [];

  for (let i = 0; theadNodes.length > i; i++) {
    theads.push(theadNodes[i].innerText);
  }
  return theads;
}

/**
 * テーブルのデータを配列として取得する
 * @returns {string[]} テーブルのデータを配列として戻す
 */
function getTbody() {
  const tbodyNodes = document.querySelectorAll("table.table tbody tr");
  let tmp = [];
  const tbodys = [];

  for (let i = 0; tbodyNodes.length > i; i++) {
    const indexNum = tbodyNodes[i].querySelector("th");
    const content = tbodyNodes[i].querySelectorAll("td");
    tmp.push(indexNum.innerText);

    for (let j = 0; content.length > j; j++) {
      tmp.push(content[j].innerText);
    }
    tbodys.push(tmp);
    tmp = [];
  }
  return tbodys;
}

/**
 * 名前が半角スペースで区切られていた場合に正規化する
 * @param {string[]} テーブルのデータ配列
 * @returns {string[]} 正規化したテーブルのデータを配列として戻す
 * @memo もっと綺麗に書きたかった…
 */
function judgeConnect(tbodys) {
  const pattern = " ";

  for (let i = 0; tbodys.length > i; i++) {
    for (let j = 0; tbodys[i].length > j; j++) {
      if (tbodys[i][j].includes(pattern)) {
        const tmp = tbodys[i][j].split(pattern);
        tbodys[i][j] = tmp[0];
        tbodys[i].splice(j + 1, 0, tmp[1]);
      }
    }
  }
  return tbodys;
}

/**
 * ユーザーデータを作成する
 * @param {string[]} theads テーブルの見出しを格納した配列
 * @param {string[]} tbodys テーブルのデータを格納した配列
 * @returns {object[]} テーブル1行 = 1オブジェクトとした配列
 */
function generateResult(theads, tbodys) {
  let userDate = {};
  const result = [];

  for (let i = 0; theads.length > i; i++) {
    for (let j = 0; tbodys.length > j; j++) {
      userDate[theads[j]] = tbodys[i][j];
    }
    result.push(userDate);
    userDate = {};
  }

  return result;
}

/**
 * A3: OKボタンを押したらアカウントを、アドレスとリポジトリに転記する関数
 */
function practice03() {
  formTriger();
}

/**
 * OKボタンを押下すると発火
 * 空白の場合はalertで警告が出る。
 */
function formTriger() {
  const button = document.getElementById("button-enter");

  button.addEventListener("click", function () {
    const account = document.getElementById("your-account");
    if (!account.value) window.alert("アカウント名を記入してください！");
    else copyAccountName(account.value);
  });
}

/**
 * アドレスとレポジトリURLにアカウント名を転記する
 * @param {String} 入力されたアカウント名
 */
function copyAccountName(accountName) {
  const emailArea = document.getElementById("basic-addon2")
    .previousElementSibling;
  const githubUrlArea = document.getElementById("basic-addon3")
    .nextElementSibling;

  emailArea.disabled = false;
  githubUrlArea.disabled = false;
  emailArea.value = accountName;
  githubUrlArea.value = accountName;
  emailArea.disabled = true;
  githubUrlArea.disabled = true;
}

/**
 * A4: チェックボックスの変更を検知する関数
 */
function practice04() {
  changeTriger();
}

/**
 * チェックボックス変更で発火する
 */
function changeTriger() {
  const fruitArea = document.getElementById("checkbox-container");
  const formAreas = fruitArea.querySelectorAll(".form-check");
  const targetNode = document.getElementById("view-checked");

  for (let i = 0; formAreas.length > i; i++) {
    const checkBox = formAreas[i].firstElementChild;

    checkBox.addEventListener("click", function () {
      if (checkBox.checked)
        targetNode.innerText = `${checkBox.value}にチェックを入れました！`;
      else if (!checkBox.checked)
        targetNode.innerText = `${checkBox.value}のチェックを外しました…`;
    });
  }
}

/**
 * A5: テーブル行の背景色を変更する関数
 */
function practice05() {
  const changeRow = "4";
  changeRowBkColor(changeRow);
}

/**
 * changeRowの行の背景色を変更する
 * changeRowがテーブル行以上である場合、alertで警告がでる
 * @param {String} 背景色を変更する行
 */
function changeRowBkColor(changeRow) {
  let flag = false;
  const tbodyNode = document.querySelectorAll("table.table th[scope=row]");

  for (let i = 0; tbodyNode.length > i; i++) {
    if (changeRow === tbodyNode[i].innerText) {
      const targetNode = tbodyNode[i].parentNode;
      targetNode.style.backgroundColor = "#4682b4";
      flag = true;
    }
  }
  if (!flag)
    window.alert(
      `指定していた「${changeRow}」は範囲外です!\n 1~${tbodyNode.length}の範囲を指定してください!`
    );
}

/**
 * A6: テーブル行のインデックスを選択するセレクトボックスを設置する関数
 */
function practice06() {
  addSelectBox();
}

/**
 * セレクトボックスを設置する
 */
function addSelectBox() {
  const container = document.getElementById("container");
  const tableNodes = document.querySelectorAll("table.table th[scope=row]");
  const select = document.createElement("select");
  select.className = "form-select";
  select.ariaLabel = "RowsSelect";
  select.id = "change-row";

  for (let i = 0; tableNodes.length > i; i++) {
    const option = document.createElement("option");
    option.value = tableNodes[i].innerText;
    option.innerText = tableNodes[i].innerText;
    select.append(option);
  }

  container.append(select);
  select.style.marginBottom = "20px";
}
/**
 * A7: ボタンを設置し、クリックするとセレクトボックスで選択されたテーブル行の背景色を変更する関数
 */
function practice07() {
  const changeBkBtn = addChangeBkBtn();
  const resetBkBtn = addResetBkBtn();
  changeBkBtn.addEventListener("click", changeBkColor);
  resetBkBtn.addEventListener("click", resetBkColor);
}

/**
 * 色を変更するボタンを設置する
 */
function addChangeBkBtn() {
  const container = document.getElementById("container");
  const changeBkBtn = document.createElement("btn");
  changeBkBtn.className = "btn btn-primary";
  changeBkBtn.innerText = "色を変更する";
  changeBkBtn.style.marginBottom = "20px";
  container.append(changeBkBtn);

  return changeBkBtn;
}

/**
 * 色をリセットするボタンを設置する
 */
function addResetBkBtn() {
  const container = document.getElementById("container");
  const resetBkBtn = document.createElement("btn");
  resetBkBtn.className = "btn btn-primary";
  resetBkBtn.innerText = "色をリセットする";
  resetBkBtn.style.marginBottom = "20px";
  resetBkBtn.style.marginLeft = "20px";

  container.append(resetBkBtn);

  return resetBkBtn;
}

/**
 * 色を変更するボタンを押下することで発火する
 */
function changeBkColor() {
  const changeRow = document.getElementById("change-row");
  changeRowBkColor(changeRow.value);
}

/**
 * 色をリセットするボタンを押下すること変更した色を元に戻す
 */
function resetBkColor() {
  const tbodyNode = document.querySelectorAll("table.table th[scope=row]");

  for (let i = 0; tbodyNode.length > i; i++) {
    const targetNode = tbodyNode[i].parentNode;
    targetNode.style.backgroundColor = "";
  }
}

practice01();
practice02();
practice03();
practice04();
practice05();
practice06();
practice07();
