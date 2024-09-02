const URL = "http://localhost:3000/records";

//socket io
const socket = io();
socket.on("connection", () => {
  console.log("Connected to Socket io");
});

socket.on("Transaction", (data) => {
  console.log(data.message);
  alert(data.message);
});

$(document).ready(function () {
  let userId = window.location.search.replace("?", "").split("=")?.[1] || 1;
  getRecords(userId);

  $("#modal1").modal();
  $("#modalTrigger").click(() => {
    $("#modal1").modal("open");
  });

  $("#addTransactionBtn").click(() => {
    addTransaction();
  });
});

const addTransaction = () => {
  let userId = window.location.search.replace("?", "").split("=")?.[1] || 1;
  let type = $("input:radio[name=transactionType]:checked").val();

  $.post({
    url: `${URL}/addRecord`,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      userId: 1,
      record: {
        recordId: 1,
        type: $("input:radio[name=transactionType]:checked").val(),
        value: $("#value").val(),
        note: $("#notes").val(),
      },
    }),
    success: function (result) {
      getRecords();
      socket.emit("Transaction", { type, userId });
    },
  });
};

const setRecordsList = (recordsList) => {
  let list = "";

  recordsList.forEach((item) => {
    const isIncome = item.type === "income";
    list += `<li class="collection-item">
      <i class="material-icons ${isIncome ? "income" : "expense"}""> ${
      isIncome ? "arrow_downward" : "arrow_upward"
    }</i>
      <span class="title " id="recordType">${item.note}</span>
      <span class="title secondary-content ${
        isIncome ? "income" : "expense"
      }" id="recordValue">
        $ ${item.value}
      </span>
    </li>`;
  });

  $("#recordsList").html(list);
};

const setBalanceValues = (balance, income, expense) => {
  $("#balance").html(
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(balance)
  );
  $("#income").html(
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(income)
  );
  $("#expense").html(
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(expense)
  );
};
const getRecords = (userId) => {
  $.get({
    url: `${URL}/getRecords/${userId}`,
    success: function (result) {
      setRecordsList(result.data?.recordsList);
      setBalanceValues(
        result.data?.balanceTotal,
        result.data?.incomeTotal,
        result.data?.expenseTotal
      );
    },
  });
};
