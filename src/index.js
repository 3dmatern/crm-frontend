const headers = [
    {
        id: "1",
        title: "ID",
        className: "trHeadThData-first",
        sort: "",
        clicked: true,
    },
    {
        id: "2",
        title: "Фамилия Имя Отчество",
        className: "trHeadThData-second",
        sort: "А-Я",
        clicked: true,
    },
    {
        id: "3",
        title: "Дата и время создания",
        className: "trHeadThData-third",
        sort: "",
        clicked: true,
    },
    {
        id: "4",
        title: "Последние изменения",
        className: "trHeadThData-fourth",
        sort: "",
        clicked: true,
    },
    {
        id: "5",
        title: "Контакты",
        className: "trHeadThData-fiveth",
        sort: "",
        clicked: false,
    },
    {
        id: "6",
        title: "Действия",
        className: "trHeadThData-sixth",
        sort: "",
        clicked: false,
    },
    {
        id: "",
        title: "",
        className: "trHeadThData-seventh",
        sort: "",
        clicked: false,
    },
];

const clients = [
    {
        id: "123455",
        surname: "Скворцов",
        name: "Денис",
        patronymic: "Юрьевич",
        created_at: 1689761902637,
        updated_at: 1689770902637,
        contacts: [
            {
                id: "1",
                label: "vk",
                value: "https://vk.com/d_matern",
                name: "VK",
            },
            {
                id: "2",
                label: "fb",
                value: "https://www.facebook.com/profile.php?id=100013360546605",
                name: "Facebook",
            },
            { id: "3", label: "tel", value: "+375441234567", name: "Телефон" },
            { id: "4", label: "email", value: "test@mail.ru", name: "Email" },
            { id: "5", label: "test", value: "test", name: "Test" },
            { id: "6", label: "test", value: "test", name: "Test" },
            { id: "7", label: "test", value: "test", name: "Test" },
            { id: "8", label: "test", value: "test", name: "Test" },
            { id: "9", label: "test", value: "test", name: "Test" },
            { id: "10", label: "test", value: "test", name: "Test" },
        ],
    },
    {
        id: "123456",
        surname: "Куприянов",
        name: "Арсений",
        patronymic: "Валерьевич",
        created_at: 1689769202637,
        updated_at: 1689770902637,
        contacts: [
            { id: "3", label: "tel", value: "+375441234567", name: "Телефон" },
            { id: "4", label: "email", value: "test@mail.ru", name: "Email" },
        ],
    },
    {
        id: "123457",
        surname: "Константинопольская",
        name: "Людмила",
        patronymic: "Александровна",
        created_at: 1689769902637,
        updated_at: 1689780902637,
        contacts: [
            {
                id: "2",
                label: "fb",
                value: "https:/facebook.com",
                name: "Facebook",
            },
            { id: "3", label: "tel", value: "+375441234567", name: "Телефон" },
            { id: "4", label: "email", value: "test@mail.ru", name: "Email" },
        ],
    },
    {
        id: "123458",
        surname: "Дмитриевский",
        name: "Олег",
        patronymic: "Алексеевич",
        created_at: 1689769902637,
        updated_at: 1689970902637,
        contacts: [
            { id: "3", label: "tel", value: "+375441234567", name: "Телефон" },
        ],
    },
    {
        id: "123459",
        surname: "Александрова",
        name: "Татьяна",
        patronymic: "Павловна",
        created_at: 1689769902637,
        updated_at: 1689790902637,
        contacts: [
            { id: "1", label: "vk", value: "https:/vk.com", name: "VK" },
            { id: "3", label: "tel", value: "+375441234567", name: "Телефон" },
            { id: "4", label: "email", value: "test@mail.ru", name: "Email" },
        ],
    },
];

/* Находим корневой элемент в DOM (точка входа) */
const root = document.querySelector("#root");

/* Создаем обертку для веб-интерфейса */
const wrapper = document.createElement("div");
// Добавляем стили
wrapper.className = "wrapper";

// Добавляем обертку в наш корневой root элемент
root.prepend(wrapper);

/* Создаем навигацию с формой поиска */
const nav = document.createElement("div");
nav.className = "nav";

const userIconWrapper = document.createElement("a");
userIconWrapper.className = "navUserIcon";
userIconWrapper.href = "/";

const userIconContent = document.createElement("div");
userIconContent.className = "navUserIconContent";
userIconContent.textContent = "skb.";

const searchForm = document.createElement("form");
searchForm.className = "navSearchForm";

const inputSearch = document.createElement("input");
inputSearch.className = "navSearchFormInput";
inputSearch.placeholder = "Введите запрос";

// Объединяем созданные элементы
searchForm.append(inputSearch);
userIconWrapper.append(userIconContent);
nav.append(userIconWrapper, searchForm);
wrapper.append(nav);

/* Создаем экран где будут отображаться данные */
const headScreen = document.createElement("div");
headScreen.className = "headScreen";

const title = document.createElement("h1");
title.className = "headScreenTitle";
title.textContent = "Клиенты";

//  Создаем обертку для таблицы и кнопки добавления клиента
const headScreenData = document.createElement("div");
headScreenData.className = "headScreenData";

headScreen.append(title, headScreenData);

// Создаем таблицу
const table = document.createElement("table");
table.className = "table";
table.id = "myTable";

const tHead = document.createElement("thead");
const trHead = document.createElement("tr");

// Создаем фунцию для генерации заголовков таблицы
const createDataHeader = ({ id, thId, title, className, sort, clicked }) => {
    const th = document.createElement("th");
    th.className = "trHeadTh";
    th.scope = "col";

    const header = document.createElement("div");
    header.className = clicked
        ? `trHeadThData ${className} pointer`
        : `trHeadThData ${className}`;
    header.textContent = title;
    header.dataset.headerId = id;
    th.append(header);

    const span = document.createElement("span");
    span.className = "trHeadThDataArrowDown";
    sort !== "" ? (span.textContent = sort) : null;

    clicked && header.append(span);

    header.addEventListener("click", () => {
        if (span.textContent === "А-Я") {
            span.textContent = "Я-А";
            span.classList.add("trHeadThDataArrowUp");
        } else if (span.textContent === "Я-А") {
            span.textContent = "А-Я";
            span.classList.remove("trHeadThDataArrowUp");
        } else {
            span.classList.toggle("trHeadThDataArrowUp");
        }
    });

    return th;
};

headers.forEach((header) => {
    const headerItem = createDataHeader(header);
    trHead.append(headerItem);
});

tHead.append(trHead);

// Создаем тело таблицы
const tBody = document.createElement("tbody");
tBody.className = "tBody";

// Создаем фунцию для вывода каждого клиента в таблицу
const createDataBody = ({
    id,
    surname,
    name,
    patronymic,
    created_at,
    updated_at,
    contacts,
}) => {
    const tr = document.createElement("tr");
    tr.className = "trBody";
    tr.id = id;

    // ID
    const thId = document.createElement("th");
    thId.className = "thId";
    thId.scope = "row";
    const thIdBody = document.createElement("div");
    thIdBody.className = "thIdBody";
    thIdBody.textContent = id;
    thId.append(thIdBody);

    // ФИО
    const tdFullName = document.createElement("td");
    tdFullName.className = "tdFullName";
    const tdFullNameBody = document.createElement("div");
    tdFullNameBody.className = "tdFullNameBody";
    tdFullNameBody.textContent = `${surname} ${name} ${patronymic}`;
    tdFullName.append(tdFullNameBody);

    // Дата и время создания клиента
    const tdCreatedAt = document.createElement("td");
    const tdCreatedAtBody = document.createElement("div");
    tdCreatedAtBody.textContent = formatDate(created_at).dayMonthYear;
    // Время
    const tdCreatedAtBodyTime = document.createElement("span");
    tdCreatedAtBodyTime.className = "tdDateBodyTime";
    tdCreatedAtBodyTime.textContent = formatDate(created_at).time;
    tdCreatedAtBody.append(tdCreatedAtBodyTime);
    tdCreatedAt.append(tdCreatedAtBody);

    // Дата и время последнего изменения клиента
    const tdUpdatedAt = document.createElement("td");
    const tdUpdatedAtBody = document.createElement("div");
    tdUpdatedAtBody.className = "tdDateBody";
    tdUpdatedAtBody.textContent = formatDate(updated_at).dayMonthYear;
    // Время
    const tdUpdatedAtBodyTime = document.createElement("span");
    tdUpdatedAtBodyTime.className = "tdDateBodyTime";
    tdUpdatedAtBodyTime.textContent = formatDate(updated_at).time;
    tdUpdatedAtBody.append(tdUpdatedAtBodyTime);
    tdUpdatedAt.append(tdUpdatedAtBody);

    // Контакты
    const tdContacts = document.createElement("td");
    tdContacts.className = "tdContacts";

    const tdContactsBody = document.createElement("div");
    tdContactsBody.className = "tdContactsBody";

    // Скрываем часть контактов

    contacts.forEach((contact, index) => {
        const item = document.createElement("a");
        item.href = contact.value;
        index > 3 ? (item.className = "d-none hidden-element") : null;

        const contactInfoWrapper = document.createElement("div");
        contactInfoWrapper.className = "contactInfoWrapper d-none";

        const contactInfo = document.createElement("span");
        contactInfo.className = "contactInfo";
        contactInfo.textContent = "contactInfo";

        const contactInfoId = document.createElement("span");
        contactInfoId.className = "contactInfoId";

        switch (contact.label) {
            case "vk":
                const vkId = contact.value.split("/");
                contactInfo.textContent = contact.label.toUpperCase() + ": ";
                contactInfoId.textContent = vkId[3];
                break;
            case "fb":
                const fbId = contact.value.split("=");
                contactInfo.textContent = contact.label.toUpperCase() + ": ";
                contactInfoId.textContent = fbId[1];
                break;

            default:
                contactInfo.className += " contactInfoTel";
                contactInfo.textContent = contact.value;
                break;
        }

        contactInfo.append(contactInfoId);
        contactInfoWrapper.append(contactInfo);
        item.append(contactInfoWrapper);

        switch (contact.label) {
            case "vk":
                item.className += " tdContactsBodyVKIcon";
                break;
            case "fb":
                item.className += " tdContactsBodyFBIcon";
                break;
            case "tel":
                item.className += " tdContactsBodyPhoneIcon";
                break;
            case "email":
                item.className += " tdContactsBodyEmailIcon";
                break;
            default:
                item.className += " tdContactsBodyDefaultIcon";
                break;
        }
        tdContactsBody.append(item);

        item.addEventListener("mouseenter", () => {
            contactInfoWrapper.classList.remove("d-none");
        });
        item.addEventListener("mouseleave", () => {
            contactInfoWrapper.classList.add("d-none");
        });
    });
    // Добавляем кнопку для показа скрытых контактов
    const toggleBtnContact = document.createElement("div");
    toggleBtnContact.className = "pointer toggleBtnContact";

    const toggleBtnContent = document.createElement("div");
    toggleBtnContent.className = "toggleBtnContent";
    contacts.length > 4 &&
        (toggleBtnContent.textContent = "+" + contacts.length - 4);

    toggleBtnContact.append(toggleBtnContent);
    contacts.length > 4 && tdContactsBody.append(toggleBtnContact);
    tdContacts.append(tdContactsBody);

    // Действия:
    // Кнопка "Изменить"
    const tdActionEdit = document.createElement("td");
    const tdCActionEditBody = document.createElement("div");
    tdCActionEditBody.className = "tdCActionsBody";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btnEdit pointer";
    btnEdit.textContent = "Изменить";
    tdActionEdit.append(btnEdit);

    // Кнопка "Удалить"
    const tdActionRemove = document.createElement("td");
    const tdCActionRemoveBody = document.createElement("div");
    tdCActionRemoveBody.className = "tdCActionsBody";

    const btnRemove = document.createElement("button");
    btnRemove.className = "btnRemove pointer";
    btnRemove.textContent = "Удалить";
    tdActionRemove.append(btnRemove);

    tr.append(
        thId,
        tdFullName,
        tdCreatedAt,
        tdUpdatedAt,
        tdContacts,
        tdActionEdit,
        tdActionRemove
    );

    return tr;
};

clients.forEach((client) => {
    const tableBodyItem = createDataBody(client);
    tBody.append(tableBodyItem);
});

table.append(tHead, tBody);

/* Создаем кнопку добавления клиента */
const addClient = document.createElement("button");
addClient.className = "addClient pointer";
addClient.textContent = "Добавить клиента";
addClient.addEventListener("click", () => {
    const modal = createModalForm("createClient", "Новый клиент");
    modal.classList.remove("d-none");
    wrapper.append(modal);
});

headScreenData.append(table, addClient);

/* Функция создания модального окна с формой для создания и изменения клиента */
const createModalForm = (modalId, title, payload) => {
    const modal = document.createElement("div");
    modal.className = "modal d-none";
    modal.id = modalId;

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";

    const modalClose = document.createElement("div");
    modalClose.className = "modalClose";

    const modalTitle = document.createElement("h3");
    modalTitle.className = "modalTitle";
    modalTitle.textContent = title;

    const clientId = document.createElement("span");
    clientId.className = "clientId";
    clientId.textContent = payload ? `ID: ${payload.id}` : null;

    const modalForm = document.createElement("form");
    modalForm.className = "modalForm";

    const labelSurname = document.createElement("label");
    labelSurname.className = "modalLabel labelSurname";
    labelSurname.textContent = "Фамилия";
    labelSurname.setAttribute("for", "surname");

    const labelStar = document.createElement("span");
    labelStar.className = "labelStar";
    labelStar.textContent = "*";
    labelSurname.append(labelStar);

    const inputSurname = document.createElement("input");
    inputSurname.className = "modalInput inputSurname";
    inputSurname.id = "surname";
    inputSurname.type = "text";
    inputSurname.name = "surname";
    inputSurname.placeholder = "Фамилия*";
    payload ? (inputSurname.value = payload.surname) : null;

    const labelName = document.createElement("label");
    labelName.className = "modalLabel labelName";
    labelName.textContent = "Имя";
    labelName.setAttribute("for", "name");
    labelName.append(labelStar);

    const inputName = document.createElement("input");
    inputName.className = "modalInput inputName";
    inputName.id = "name";
    inputName.type = "text";
    inputName.name = "name";
    inputName.placeholder = "Имя*";
    payload ? (inputName.value = payload.name) : null;

    const labelPatronymic = document.createElement("label");
    labelPatronymic.className = "modalLabel labelPatronymic";
    labelPatronymic.textContent = "Отчество";
    labelPatronymic.setAttribute("for", "patronymic");
    labelPatronymic.append(labelStar);

    const inputPatronymic = document.createElement("input");
    inputPatronymic.className = "modalInput inputName";
    inputPatronymic.id = "patronymic";
    inputPatronymic.type = "text";
    inputPatronymic.name = "patronymic";
    inputPatronymic.placeholder = "Отчество*";
    payload ? (inputPatronymic.value = payload.patronymic) : null;

    const addContact = document.createElement("div");
    addContact.className =
        payload && payload.contacts.length > 5
            ? "addContact addContactScroll"
            : "addContact";

    payload &&
        payload.contacts.forEach((c) => {
            addContact.prepend(createContact(c));
        });

    const addContactBtn = document.createElement("button");
    addContactBtn.className = "addContactBtn pointer";
    addContactBtn.textContent = "Добавить контакт";
    addContactBtn.type = "button";
    addContact.append(addContactBtn);

    const errorMessage = document.createElement("div");
    errorMessage.className = "errorMessage d-none";
    errorMessage.textContent =
        "Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!";

    const submitBtn = document.createElement("button");
    submitBtn.className = "submitBtn pointer";
    submitBtn.textContent = "Сохранить";
    submitBtn.type = "submit";

    const cancelOrRemove = document.createElement("div");
    cancelOrRemove.className = "cancelOrRemove pointer";
    cancelOrRemove.textContent = payload ? "Удалить клиента" : "Отменить";

    modalForm.append(
        inputSurname,
        inputName,
        inputPatronymic,
        addContact,
        errorMessage,
        submitBtn,
        cancelOrRemove
    );

    payload && modalContent.append(clientId);
    modalContent.append(modalClose, modalTitle, modalForm);
    modal.append(modalContent);

    modalClose.addEventListener("click", () => {
        modal.remove();
    });

    addContactBtn.addEventListener("click", () => {
        addContact.prepend(createContact());
    });

    cancelOrRemove.textContent === "Отменить" &&
        cancelOrRemove.addEventListener("click", () => {
            modal.remove();
        });

    window.onclick = (e) => {
        if (e.target == document.getElementById(modalId)) {
            document.getElementById(modalId).classList.add("d-none");
        }
    };
    return modal;
};

/* Функция создания ввода контакта */
function createContact(payload) {
    const contactWraper = document.createElement("div");
    contactWraper.className = "contactWraper";

    const contacts = [
        { id: "1", label: "tel", value: "Доп. телефон" },
        { id: "2", label: "email", value: "Email" },
        { id: "3", label: "vk", value: "VK" },
        { id: "4", label: "fb", value: "Facebook" },
    ];

    const selectArrow = document.createElement("button");
    selectArrow.className = "selectArrowDown";

    const selectWraper = document.createElement("div");
    selectWraper.className = "selectWraper";

    const select = document.createElement("div");
    select.className = "select";
    select.textContent = payload.name || "Телефон";

    const selectLists = document.createElement("ul");
    selectLists.className = "selectLists d-none";

    const inputContact = document.createElement("input");
    inputContact.className = "inputContact";
    inputContact.name = "tel";
    inputContact.type = "text";
    inputContact.placeholder = "Введите данные контакта";
    inputContact.value = payload.value || null;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.type = "button";
    // Удаление select + input при нажатии на кнопку с круглым крестиком
    deleteBtn.addEventListener("click", () => {
        contactWraper.remove();
    });

    select.addEventListener("click", () => {
        selectLists.classList.toggle("d-none");
        selectArrow.classList.toggle("selectArrowUp");
    });

    selectLists.addEventListener("click", () => {
        selectLists.classList.add("d-none");
    });

    contacts.forEach((c) => {
        const li = document.createElement("ul");
        li.className = "selectListsItem";
        li.id = c.label;
        li.textContent = c.value;

        li.addEventListener("click", () => {
            select.textContent =
                li.textContent === "Доп. телефон" ? "Телефон" : li.innerText;
            inputContact.name = li.id;
        });

        selectLists.append(li);
    });

    selectWraper.append(select, selectLists);
    contactWraper.append(selectArrow, selectWraper, inputContact, deleteBtn);

    return contactWraper;
}

/* Итог */
// const modal = createModalForm("createClient", "Новый клиент");
wrapper.append(headScreen);

/* Функция для создания спинера загрузки данных */
function createSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const spinnerIcon = document.createElement("div");
    spinnerIcon.className = "spinner-icon";

    spinner.appendChild(spinnerIcon);

    return spinner;
}

/* Функция для показа скрытых контактов */
const toggleElements = () => {
    const elementsToToggle = document.querySelectorAll(".hidden-element");

    elementsToToggle.forEach((element) => {
        if (element.classList.contains("d-none")) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
};

const toggleButton = document.querySelector(".toggleBtnContact");
toggleButton.addEventListener("click", () => {
    toggleElements();
    toggleButton.classList.add("d-none");
});

/* Функция вызова модального окна для изменения данных */
const myTable = document.querySelector(".table");

const handleEditBtn = (e) => {
    const clickedButton = e.target; // Целевой элемент, на который было нажатие
    const clickedRow = clickedButton.parentNode.parentNode; // Родительская строка, содержащая кнопку
    const rowData = Array.from(clickedRow.children).map(
        (cell) => cell.textContent
    ); // Значения ячеек строки

    const client = clients.find((c) => c.id === rowData[0]);
    return client;
};

myTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEdit")) {
        const client = handleEditBtn(e);
        const modal = createModalForm("editClient", "Изменить данные", client);
        modal.classList.remove("d-none");
        wrapper.append(modal);
    }
});

// Для удаления клиента
const handleDeleteBtn = (e) => {
    const clickedButton = e.target; // Целевой элемент, на который было нажатие
    const clickedRow = clickedButton.parentNode.parentNode; // Родительская строка, содержащая кнопку
    const rowData = Array.from(clickedRow.children).map(
        (cell) => cell.textContent
    ); // Значения ячеек строки

    return rowData[0];
};

myTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnRemove")) {
        const clientId = handleDeleteBtn(e);
        const modal = createDeleteModal(clientId);
        modal.classList.remove("d-none");
        wrapper.append(modal);
    }
});

function createDeleteModal(clientId) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "deleteModal";

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent modalContentDeleted";

    const modalClose = document.createElement("div");
    modalClose.className = "modalClose";

    const modalTitle = document.createElement("h3");
    modalTitle.className = "modalTitleDeleted";
    modalTitle.textContent = "Удалить клиента";

    const modalText = document.createElement("div");
    modalText.className = "modalTextDeleted";
    modalText.textContent = "Вы действительно хотите удалить данного клиента?";

    const modalForm = document.createElement("form");
    modalForm.className = "modalFormDeleted";

    const inputClientId = document.createElement("input");
    inputClientId.className = "modalInputDeleted";
    inputClientId.id = "clientId";
    inputClientId.type = "text";
    inputClientId.name = "clientId";
    inputClientId.value = clientId;

    const submitBtn = document.createElement("button");
    submitBtn.className = "submitBtn pointer";
    submitBtn.textContent = "Удалить";
    submitBtn.type = "submit";

    const cancel = document.createElement("div");
    cancel.className = "cancelOrRemove pointer";
    cancel.textContent = "Отменить";

    modalForm.append(inputClientId, submitBtn, cancel);

    modalContent.append(modalClose, modalTitle, modalText, modalForm);
    modal.append(modalContent);

    modalClose.addEventListener("click", () => {
        modal.remove();
    });

    cancel.addEventListener("click", () => {
        modal.remove();
    });

    window.onclick = (e) => {
        if (e.target == document.getElementById("deleteModal")) {
            document.getElementById("deleteModal").classList.add("d-none");
        }
    };
    return modal;
}

/* Сортировка по заголовкам таблицы */
const getAllTh = document.querySelectorAll("th");
getAllTh.forEach((th, index) => {
    if (index < 4) {
        th.onclick = () => sortTable(index);
    }
});

let sortDirections = [1, 0, 0, 0]; // Устанавливаем активную сортировку по ID

window.onload = function () {
    document
        .querySelector(".trHeadThData-first")
        .children[0].classList.add("trHeadThDataArrowUp");
    sortTable(0); // Вызываем сортировку по ID при загрузке страницы

    // Метод для searchInput
    let searchInput = document.querySelector(".navSearchFormInput");
    searchInput.addEventListener("input", function () {
        let searchText = this.value.toLowerCase();
        let rows = document.getElementsByClassName("trBody");

        for (let i = 0; i < rows.length; i++) {
            let rowData = rows[i].textContent.toLowerCase();
            if (rowData.includes(searchText)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    });
};

function sortTable(columnIndex) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;

    // Инвертирование текущего направления сортировки
    sortDirections[columnIndex] ^= 1;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;

            x = rows[i].cells[columnIndex];
            y = rows[i + 1].cells[columnIndex];

            if (compareColumnValues(x, y, columnIndex) > 0) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function compareColumnValues(cell1, cell2, columnIndex) {
    let value1, value2;

    if (cell1.getAttribute("data-sort-type") === "date") {
        value1 = new Date(cell1.innerHTML);
        value2 = new Date(cell2.innerHTML);
    } else {
        value1 = cell1.innerHTML.toLowerCase();
        value2 = cell2.innerHTML.toLowerCase();
    }

    // Учитываем текущее направление сортировки
    if (sortDirections[columnIndex] === 0) {
        return value1 > value2 ? 1 : -1;
    } else {
        return value1 < value2 ? 1 : -1;
    }
}

/* Функция форматирования даты */
function formatDate(date) {
    const oldDate = new Date(date);
    const day = isOneDigit(oldDate.getDate());
    const month = isOneDigit(oldDate.getMonth() + 1);
    const year = oldDate.getFullYear();
    const hours = isOneDigit(oldDate.getHours());
    const minutes = isOneDigit(oldDate.getMinutes());
    return {
        dayMonthYear: `${day}.${month}.${year}`,
        time: `${hours}:${minutes}`,
    };
}

/* Функция форматирования даты, для длбавления нулей цифрам */
function isOneDigit(date) {
    if (date >= 0 && date < 10) {
        return `0${date}`;
    }
    return date;
}

// Функция генерации ID
function generateRandomId() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 8;
    let randomId = "";

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
    }

    return randomId;
}
