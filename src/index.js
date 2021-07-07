import "./styles.css";

const onClickAdd = () => {
  //taskの取得とinputの初期化
  const inputText = document.getElementById("add-text").value;
  //入力確認
  if (!inputText) {
    alert("TODOを入力してください");
  } else {
    document.getElementById("add-text").value = "";
    // incomplete-listにtaskを追加
    createIncompleteList(inputText);
  }
};

//incomplete-list作成
const createIncompleteList = (text) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";
  const p = document.createElement("p");
  p.className = "todo-sub";
  //taskを代入
  p.innerText = text;
  const compButton = document.createElement("button");
  compButton.innerText = "完了";
  const deliteButton = document.createElement("button");
  deliteButton.innerText = "削除";
  // listの雛形を生成
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(compButton);
  div.appendChild(deliteButton);
  //incomplite-listに追加
  document.getElementById("incomplete-list").appendChild(li);

  //完了ボタンが押されたらtaskをcomplete-listに移動
  compButton.addEventListener("click", () => {
    //完了ボタンが押されたリストをincomplete-listから削除
    deliteFromIncompleteList(compButton);
    //complete-list作成
    const addList = compButton.parentNode.parentNode;
    const p = document.createElement("p");
    p.className = "todo-sub";
    p.innerText = addList.firstElementChild.firstElementChild.innerText;
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    //liの雛形を初期化して再利用
    addList.firstElementChild.textContent = null;
    addList.firstElementChild.appendChild(p);
    addList.firstElementChild.appendChild(backButton);
    document.getElementById("complete-list").appendChild(addList);

    //戻すボタンを押されたらincomplete-listにtaskを戻す
    backButton.addEventListener("click", () => {
      //戻るボタンが押されたリストをcomplete-listから削除
      deliteFromCompleteList(backButton);
      // incomplete-listにtaskを追加
      const backList = backButton.parentNode.parentNode;
      const moveText = backList.firstElementChild.firstElementChild.innerText;
      createIncompleteList(moveText);
    });
  });

  //削除ボタンが押されたリストをincomplete-listから削除
  deliteButton.addEventListener("click", () => {
    deliteFromIncompleteList(deliteButton);
  });
};

//リスト削除
const deliteFromIncompleteList = (button) => {
  const deliteTarget = button.parentNode.parentNode;
  document.getElementById("incomplete-list").removeChild(deliteTarget);
};
const deliteFromCompleteList = (button) => {
  const deliteTarget = button.parentNode.parentNode;
  document.getElementById("complete-list").removeChild(deliteTarget);
};

document
  .getElementById("add-task")
  .addEventListener("click", () => onClickAdd());
