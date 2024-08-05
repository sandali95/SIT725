const URL = "http://localhost:3000";

$(document).ready(function () {
  getRecords();

  $("#modal1").modal();
  $("#modalTrigger").click(() => {
    $("#modal1").modal("open");
  });

  $("#addTransactionBtn").click(() => {
    addTransaction();
  });
});

const addTransaction = () => {
  $.post({
    url: `${URL}/addRecord`,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      type: $("input:radio[name=transactionType]:checked").val(),
      value: $("#value").val(),
      notes: $("#notes").val(),
      userId: "1",
    }),
    success: function (result) {
      setRecordsList(result.data.recordsList);
      setBalanceValues(
        result.data.balanceTotal,
        result.data.incomeTotal,
        result.data.expenseTotal
      );
    },
  });
};

const setRecordsList = (recordsList) => {
  let list = "";

  recordsList.forEach((item) => {
    const isIncome = item[0] === "income";
    list += `<li class="collection-item">
      <i class="material-icons ${isIncome ? "income" : "expense"}""> ${
      isIncome ? "arrow_downward" : "arrow_upward"
    }</i>
      <span class="title " id="recordType">${item[2]}</span>
      <span class="title secondary-content ${
        isIncome ? "income" : "expense"
      }" id="recordValue">
        $ ${item[1]}
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
const getRecords = () => {
  const userId = "1";
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
