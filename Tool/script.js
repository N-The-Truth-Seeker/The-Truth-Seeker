
var players = [];
var currentIndex = 0;
var gameStarted = false; // 配役が開始されたかどうかのフラグ

function startGame() {
  if (gameStarted) {
    return; // 配役が既に開始されている場合は何もしない
  }

  gameStarted = true; // 配役開始フラグを立てる

  players = []; // プレイヤーの配列をリセット
  currentIndex = 0; // 現在のインデックスをリセット

  var playerCount = parseInt(document.getElementById('playerCount').value);
  for (var i = 0; i < playerCount; i++) {
    players.push('探究者');
  }
  var werewolfIndex = Math.floor(Math.random() * playerCount);
  players[werewolfIndex] = '嘘つき';
  displayRole();
  document.getElementById('startButton').disabled = true; // 配役開始ボタンを無効化する
}

function displayRole() {
  var resultDiv = document.getElementById('result');
  var currentPlayer = players[currentIndex];

  var roleText = document.createElement('span');
  roleText.textContent = 'プレイヤー ' + (currentIndex + 1) + ' は「' + currentPlayer + '」です。';
  document.getElementById('nextButton').disabled = true;

  if (currentPlayer === '嘘つき') {
    roleText.classList.add('lying');
  } else if (currentPlayer === '探究者') {
    roleText.classList.add('explorer');
  }

  resultDiv.innerHTML = '';
  resultDiv.appendChild(roleText);

  setTimeout(function() {
    hideRole();
    showNextMessage();
  }, 4000);
}

function hideRole() {
  document.getElementById('result').innerHTML = '';
}

function showNextMessage() {
  var resultDiv = document.getElementById('result');
  if (currentIndex < players.length - 1) {
    resultDiv.innerHTML = '次の人に渡してください。';
    document.getElementById('nextButton').disabled = false;
  } else {
    resultDiv.innerHTML = '配役終了';
    document.getElementById('nextButton').disabled = true;
    gameStarted = false; // 配役終了時にフラグをリセットして再び配役開始ボタンを押せるようにする
    document.getElementById('startButton').disabled = false;
  }
}

function nextPlayer() {
  currentIndex++;
  if (currentIndex < players.length) {
    displayRole();
  }
}

var keywordElement = document.getElementById("keyword");
var intervalIdKeyword; // キーワードのインターバルIDを格納する変数

function generateKeyword() {
  var keywords = [
    "好きな映画", "旅行", "推し", "あってみたい人", "今ハマっていること", "好きなゲームのジャンル", "スポーツ", "音楽", "好きな食べ物", "きのこ・たけのこ", "好きな飲み物", "好きな国", "嫌いな教科", "好きなユーチューバー", "好きなおやつ", "嫌いな教科", "なりたい職業(なりたかった職業)", "好きなゲーム", "自分の趣味", "好きな本", "好きなアーティスト/バンド", "好きな動物", "好きな季節", "好きな花", "好きな車のメーカー", "好きなテレビ番組", "好きな言語", "休日の過ごし方", "好きなイベント", "好きなスポーツチーム", "好きな料理", "好きな祝日", "好きなアート作品", "好きな科学分野", "好きな企業のタイプ", "インターネットの活用方法", "好きな時代", "好きな人物の特徴", "好きな歴史人物", "好きな言葉/名言", "フィットネスアクティビティ", "好きな家具", "好きな楽器", "好きなテーマパーク", "好きな色", "好きなネットミーム", "好きな調味料", "好きなイヤホン", "好きな演説","欲しいペット","好きな祭り"
  ];

  clearInterval(intervalIdKeyword); // 既存のインターバルをクリアする
    keywordElement.classList.remove("highlight"); // 点滅アニメーションを停止する

    var count = 0;
    intervalIdKeyword = setInterval(function() {
      var randomIndex = Math.floor(Math.random() * keywords.length);
      keywordElement.textContent = keywords[randomIndex];
      count++;

      if (count === 30) {
        clearInterval(intervalIdKeyword); // インターバルを停止する
        keywordElement.classList.remove("highlight"); // 点滅アニメーションを停止する
      }
    }, 40);

    keywordElement.classList.add("highlight"); // 点滅アニメーションを適用する
    keywordElement.textContent = ""; // 初期化
  }

  function startTimerCountdown() {
    clearInterval(intervalIdKeyword); // キーワードのインターバルをクリアする
    keywordElement.classList.remove("highlight"); // 点滅アニメーションを停止する

    var durationInput = document.getElementById("duration");
    var duration = parseInt(durationInput.value);

    var timer = duration * 60;
    var minutesDisplay = document.getElementById("min");
    var secondsDisplay = document.getElementById("sec");

    intervalIdKeyword = setInterval(function() {
      var minutes = Math.floor(timer / 60);
      var seconds = timer % 60;

      minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;

      if (timer === 0) {
        clearInterval(intervalIdKeyword); // インターバルを停止する
        document.getElementById("sound").play(); // タイマー終了時のサウンドを再生する
      } else {
        timer--;
      }
    }, 1000);
  }
