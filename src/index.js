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

const userIconWrapper = document.createElement("div");
userIconWrapper.className = "navUserIcon";

const userIconContent = document.createElement("div");
userIconContent.className = "navUserIconContent";
userIconContent.innerText = "skb.";

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
title.innerText = "Клиенты";

//  Создаем обертку для таблицы и кнопки добавления клиента
const headScreenData = document.createElement("div");
headScreenData.className = "headScreenData";

headScreen.append(title, headScreenData);

// Создаем таблицу
const table = document.createElement("table");
table.className = "table";
const tHead = document.createElement("thead");
const trHead = document.createElement("tr");

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

// Создаем фунцию для генерации заголовков таблицы
const createDataHeader = ({ id, title, className, sort, clicked }) => {
    const th = document.createElement("th");
    th.className = "trHeadTh";
    th.scope = "col";

    const header = document.createElement("div");
    header.className = clicked
        ? `trHeadThData ${className} pointer`
        : `trHeadThData ${className}`;
    header.innerText = title;
    header.dataset.headerId = id;
    th.append(header);

    const span = document.createElement("span");
    span.className = "trHeadThDataArrowUp";
    sort !== "" ? (span.innerText = sort) : null;

    clicked && header.append(span);

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

const clients = [
    {
        id: "123455",
        surname: "Скворцов",
        name: "Денис",
        patronymic: "Юрьевич",
        created_at: 1689769902637,
        updated_at: 1689770902637,
        contacts: [
            { id: "1", label: "vk", value: "https:/vk.com" },
            { id: "2", label: "fb", value: "https:/facebook.com" },
            { id: "3", label: "phone", value: "+375441234567" },
            { id: "4", label: "email", value: "test@mail.ru" },
            { id: "5", label: "test", value: "test" },
            { id: "6", label: "test", value: "test" },
            { id: "7", label: "test", value: "test" },
            { id: "8", label: "test", value: "test" },
            { id: "9", label: "test", value: "test" },
            { id: "10", label: "test", value: "test" },
        ],
    },
    {
        id: "123456",
        surname: "Куприянов",
        name: "Арсений",
        patronymic: "Валерьевич",
        created_at: 1689769902637,
        updated_at: 1689770902637,
        contacts: [
            { id: "3", label: "phone", value: "+375441234567" },
            { id: "4", label: "email", value: "test@mail.ru" },
        ],
    },
    {
        id: "123457",
        surname: "Константинопольская",
        name: "Людмила",
        patronymic: "Александровна",
        created_at: 1689769902637,
        updated_at: 1689770902637,
        contacts: [
            { id: "2", label: "fb", value: "https:/facebook.com" },
            { id: "3", label: "phone", value: "+375441234567" },
            { id: "4", label: "email", value: "test@mail.ru" },
        ],
    },
    {
        id: "123458",
        surname: "Дмитриевский",
        name: "Олег",
        patronymic: "Алексеевич",
        created_at: 1689769902637,
        updated_at: 1689770902637,
        contacts: [{ id: "3", label: "phone", value: "+375441234567" }],
    },
    {
        id: "123459",
        surname: "Александрова",
        name: "Татьяна",
        patronymic: "Павловна",
        created_at: 1689769902637,
        updated_at: 1689770902637,
        contacts: [
            { id: "1", label: "vk", value: "https:/vk.com" },
            { id: "3", label: "phone", value: "+375441234567" },
            { id: "4", label: "email", value: "test@mail.ru" },
        ],
    },
];

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

    // ID
    const thId = document.createElement("th");
    thId.className = "thId";
    thId.scope = "row";
    const thIdBody = document.createElement("div");
    thIdBody.className = "thIdBody";
    thIdBody.innerText = id;
    thId.append(thIdBody);

    // ФИО
    const tdFullName = document.createElement("td");
    tdFullName.className = "tdFullName";
    const tdFullNameBody = document.createElement("div");
    tdFullNameBody.className = "tdFullNameBody";
    tdFullNameBody.innerText = `${surname} ${name} ${patronymic}`;
    tdFullName.append(tdFullNameBody);

    // Дата и время создания клиента
    const tdCreatedAt = document.createElement("td");
    const tdCreatedAtBody = document.createElement("div");
    tdCreatedAtBody.innerText = formatDate(created_at).dayMonthYear;
    // Время
    const tdCreatedAtBodyTime = document.createElement("span");
    tdCreatedAtBodyTime.className = "tdDateBodyTime";
    tdCreatedAtBodyTime.innerText = formatDate(created_at).time;
    tdCreatedAtBody.append(tdCreatedAtBodyTime);
    tdCreatedAt.append(tdCreatedAtBody);

    // Дата и время последнего изменения клиента
    const tdUpdatedAt = document.createElement("td");
    const tdUpdatedAtBody = document.createElement("div");
    tdUpdatedAtBody.className = "tdDateBody";
    tdUpdatedAtBody.innerText = formatDate(updated_at).dayMonthYear;
    // Время
    const tdUpdatedAtBodyTime = document.createElement("span");
    tdUpdatedAtBodyTime.className = "tdDateBodyTime";
    tdUpdatedAtBodyTime.innerText = formatDate(updated_at).time;
    tdUpdatedAtBody.append(tdUpdatedAtBodyTime);
    tdUpdatedAt.append(tdUpdatedAtBody);

    // Контакты
    const tdContacts = document.createElement("td");
    tdContacts.className = "tdContacts";
    const tdContactsBody = document.createElement("div");
    tdContactsBody.className = "tdContactsBody";
    contacts.forEach((contact) => {
        const item = document.createElement("a");
        item.href = contact.value;
        switch (contact.label) {
            case "vk":
                item.className = "tdContactsBodyVKIcon";
                break;
            case "fb":
                item.className = "tdContactsBodyFBIcon";
                break;
            case "phone":
                item.className = "tdContactsBodyPhoneIcon";
                break;
            case "email":
                item.className = "tdContactsBodyEmailIcon";
                break;
            default:
                item.className = "tdContactsBodyDefaultIcon";
                break;
        }
        tdContactsBody.append(item);
    });
    tdContacts.append(tdContactsBody);

    // Действия:
    // Кнопка "Изменить"
    const tdActionEdit = document.createElement("td");
    const tdCActionEditBody = document.createElement("div");
    tdCActionEditBody.className = "tdCActionsBody";
    const btnEdit = document.createElement("button");
    btnEdit.className = "btnEdit pointer";
    btnEdit.innerText = "Изменить";
    tdActionEdit.append(btnEdit);

    // Кнопка "Удалить"
    const tdActionRemove = document.createElement("td");
    const tdCActionRemoveBody = document.createElement("div");
    tdCActionRemoveBody.className = "tdCActionsBody";
    const btnRemove = document.createElement("button");
    btnRemove.className = "btnRemove pointer";
    btnRemove.innerText = "Удалить";
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
addClient.innerText = "Добавить клиента";

headScreenData.append(table, addClient);

/* Функция создания модального окна с формой для создания и изменения клиента */
const createModalForm = (modalId, title, payload) => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = modalId;

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";

    const modalClose = document.createElement("div");
    modalClose.className = "modalClose";

    const modalTitle = document.createElement("h3");
    modalTitle.className = "modalTitle";
    modalTitle.innerText = title;

    const clientId = document.createElement("span");
    clientId.className = "clientId";
    clientId.innerText = payload ? `ID: ${payload.id}` : null;

    const modalForm = document.createElement("form");
    modalForm.className = "modalForm";

    const inputSurname = document.createElement("input");
    inputSurname.className = "modalInput inputSurname";
    inputSurname.id = "surname";
    inputSurname.type = "text";
    inputSurname.name = "surname";
    inputSurname.placeholder = "Фамилия*";
    payload ? (inputSurname.value = payload.surname) : null;

    const inputName = document.createElement("input");
    inputName.className = "modalInput inputName";
    inputName.id = "name";
    inputName.type = "text";
    inputName.name = "name";
    inputName.placeholder = "Имя*";
    payload ? (inputName.value = payload.name) : null;

    const inputPatronymic = document.createElement("input");
    inputPatronymic.className = "modalInput inputName";
    inputPatronymic.id = "patronymic";
    inputPatronymic.type = "text";
    inputPatronymic.name = "patronymic";
    inputPatronymic.placeholder = "Отчество*";
    payload ? (inputPatronymic.value = payload.patronymic) : null;

    const addContact = document.createElement("div");
    addContact.className = "addContact";

    const addContactBtn = document.createElement("button");
    addContactBtn.className = "addContactBtn pointer";
    addContactBtn.textContent = "Добавить контакт";
    addContact.append(addContactBtn);

    const errorMessage = document.createElement("div");
    errorMessage.className = "errorMessage d-none";
    errorMessage.innerText =
        "Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!";

    const submitBtn = document.createElement("button");
    submitBtn.className = "submitBtn";
    submitBtn.innerText = "Сохранить";

    const cancelOrRemove = document.createElement("button");
    cancelOrRemove.className = "cancelOrRemove pointer";
    cancelOrRemove.innerText = payload ? "Удалить" : "Отменить";

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

    return modal;
};

/* Итог */
const modal = createModalForm("createClient", "Новый клиент");
wrapper.append(headScreen, modal);

const contacts = [
    { id: "1", label: "vk", value: "Vk" },
    { id: "2", label: "fb", value: "Facebook" },
    { id: "3", label: "email", value: "Facebook" },
];

const inputSelect = document.createElement("input");
inputSelect.className = "modalInput inputName";
inputSelect.id = "patronymic";
inputSelect.type = "text";
inputSelect.name = "patronymic";
inputSelect.placeholder = "Отчество*";

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
