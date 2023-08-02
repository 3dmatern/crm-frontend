const headers = [
    {
        id: "1",
        title: "ID",
        className: "idCol",
        sort: "",
        dataSort: "id",
        clicked: true,
    },
    {
        id: "2",
        title: "Фамилия Имя Отчество",
        className: "fioCol",
        sort: "А-Я",
        dataSort: "fio",
        clicked: true,
    },
    {
        id: "3",
        title: "Дата и время создания",
        className: "dateCol dateCol-headerDate",
        sort: "",
        dataSort: "createdAt",
        clicked: true,
    },
    {
        id: "4",
        title: "Последние изменения",
        className: "dateCol dateCol-headerDate",
        sort: "",
        dataSort: "updatedAt",
        clicked: true,
    },
    {
        id: "5",
        title: "Контакты",
        className: "contactCol",
        sort: "",
        dataSort: "",
        clicked: false,
    },
    {
        id: "6",
        title: "Действия",
        className: "actionCol",
        sort: "",
        dataSort: "",
        clicked: false,
    },
];
let countCreateContact = 0;
let countUpdateModal = 0;
const limit = 10;

getClients();
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

// Создаем div-таблицу
const divTable = document.createElement("div");
divTable.className = "divTable";
divTable.id = "clientTabel";

const divTHeaders = document.createElement("div");
divTHeaders.className = "divTHeaders";

// Создаем фунцию для генерации заголовков таблицы
const createDivTHeaderItem = ({
    id,
    title,
    className,
    sort,
    dataSort,
    clicked,
}) => {
    const divTableHeader = document.createElement("div");
    divTableHeader.id = "divTHeader";
    divTableHeader.className = clicked
        ? id === "1"
            ? ` ${className} pointer divTHeaderActive`
            : ` ${className} pointer`
        : ` ${className}`;
    dataSort !== "" && divTableHeader.setAttribute("data-sort", dataSort);
    divTableHeader.textContent = title;

    const span = document.createElement("span");
    span.className = "divTHeaderArrowDown";
    sort !== "" ? (span.textContent = sort) : null;

    clicked && divTableHeader.append(span);

    divTableHeader.addEventListener("click", () => {
        if (span.textContent === "А-Я") {
            span.textContent = "Я-А";
            span.classList.add("divTHeaderArrowUp");

            // Вызов функции для сортировки элементов по убыванию
            sortItems("desc");
        } else if (span.textContent === "Я-А") {
            span.textContent = "А-Я";
            span.classList.remove("divTHeaderArrowUp");

            // Вызов функции для сортировки элементов по возрастанию
            sortItems("asc");
        } else {
            span.classList.toggle("divTHeaderArrowUp");

            // Вызов функции для сортировки элементов в обратном порядке
            sortItems("reverse");
        }
    });

    return divTableHeader;
};

headers.forEach((header) => {
    const headerItem = createDivTHeaderItem(header);
    divTHeaders.append(headerItem);
});

// Создаем тело таблицы
const divTBody = document.createElement("div");
divTBody.className = "divTBody";

// Создаем фунцию для вывода каждого клиента в таблицу
const createDivTBodyItem = ({
    id,
    surname,
    name,
    lastName,
    createdAt,
    updatedAt,
    contacts,
}) => {
    const divTBodyItem = document.createElement("div");
    divTBodyItem.className = "divTBodyItem";
    divTBodyItem.id = id;

    // ID
    const itemId = document.createElement("div");
    itemId.className = "idCol itemId";
    itemId.textContent = id;

    // ФИО
    const itemFullName = document.createElement("div");
    itemFullName.className = "fioCol itemFullName";
    itemFullName.textContent = `${surname} ${name} ${lastName}`;

    // Дата и время создания клиента
    const itemCreatedAt = document.createElement("div");
    itemCreatedAt.className = "dateCol itemDate";
    itemCreatedAt.textContent = formatDate(createdAt).dayMonthYear;
    // Время
    const itemCreatedAtTime = document.createElement("div");
    itemCreatedAtTime.className = "itemDateTime";
    itemCreatedAtTime.textContent = formatDate(createdAt).time;
    itemCreatedAt.append(itemCreatedAtTime);

    // Дата и время последнего изменения клиента
    const itemUpdatedAt = document.createElement("div");
    itemUpdatedAt.className = "dateCol itemDate";
    itemUpdatedAt.textContent = formatDate(updatedAt).dayMonthYear;
    // Время
    const tdUpdatedAtBodyTime = document.createElement("div");
    tdUpdatedAtBodyTime.className = "itemDateTime";
    tdUpdatedAtBodyTime.textContent = formatDate(updatedAt).time;
    itemUpdatedAt.append(tdUpdatedAtBodyTime);

    // Контакты
    const itemContacts = document.createElement("div");
    itemContacts.className = "contactCol itemContacts";

    // Скрываем часть контактов
    contacts.forEach((contact, index) => {
        const item = document.createElement("a");
        switch (contact.type) {
            case "tel":
                item.href = "tel:" + contact.value;
                break;
            case "email":
                item.href = "mailto:" + contact.value;
                break;
            case "vk":
                item.href = contact.value;
                break;
            case "fb":
                item.href = contact.value;
                break;

            default:
                item.href = "./";
                break;
        }
        index > 3 ? (item.className = "d-none hidden-element") : null;

        const contactInfoWrapper = document.createElement("div");
        contactInfoWrapper.className = "contactInfoWrapper d-none";

        const contactInfo = document.createElement("span");
        contactInfo.className = "contactInfo";
        contactInfo.textContent = "contactInfo";

        const contactInfoId = document.createElement("span");
        contactInfoId.className = "contactInfoId";

        switch (contact.type) {
            case "vk":
                const vkId = contact.value.split("/");
                contactInfo.textContent = contact.type.toUpperCase() + ": ";
                contactInfoId.textContent = vkId[3];
                break;
            case "fb":
                const fbId = contact.value.split("=");
                contactInfo.textContent = contact.type.toUpperCase() + ": ";
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

        switch (contact.type) {
            case "vk":
                item.className += " itemContactsVKIcon";
                break;
            case "fb":
                item.className += " itemContactsFBIcon";
                break;
            case "tel":
                item.className += " itemContactsPhoneIcon";
                break;
            case "email":
                item.className += " itemContactsEmailIcon";
                break;
            default:
                item.className += " itemContactsDefaultIcon";
                break;
        }
        itemContacts.append(item);

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
    contacts.length > 4 && itemContacts.append(toggleBtnContact);

    toggleBtnContact.addEventListener("click", () => {
        toggleElements(itemContacts);
        toggleBtnContact.remove();
    });

    // Действия:
    const itemActions = document.createElement("div");
    itemActions.className = "actionCol itemActions";

    // Кнопка "Изменить"
    const btnEdit = document.createElement("button");
    btnEdit.className = "btnEdit pointer";
    btnEdit.textContent = "Изменить";

    const btnEditIcon = document.createElement("div");
    btnEditIcon.className = "btnEditIcon";
    btnEdit.append(btnEditIcon);

    // Кнопка "Удалить";
    const btnRemove = document.createElement("button");
    btnRemove.className = "btnRemove pointer";
    btnRemove.textContent = "Удалить";
    itemActions.append(btnEdit, btnRemove);

    divTBodyItem.append(
        itemId,
        itemFullName,
        itemCreatedAt,
        itemUpdatedAt,
        itemContacts,
        itemActions
    );

    return divTBodyItem;
};

divTable.append(divTHeaders, divTBody);

/* Создаем кнопку добавления клиента */
const addClient = document.createElement("button");
addClient.className = "addClient pointer";
addClient.textContent = "Добавить клиента";
addClient.addEventListener("click", () => {
    const modal = createModalForm("createClient", "Новый клиент");
    modal.classList.remove("d-none");
    wrapper.append(modal);
});

headScreenData.append(divTable, addClient);

/* Функция модального окна с формой для создания клиента */
function createModalForm(modalId, title) {
    const modal = document.createElement("div");
    modal.className = "modal d-none";
    modal.id = "createModal";

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";

    const modalClose = document.createElement("div");
    modalClose.className = "modalClose";

    const modalTitle = document.createElement("h3");
    modalTitle.className = "modalTitle";
    modalTitle.textContent = title;

    const modalForm = document.createElement("form");
    modalForm.className = "modalForm";
    modalForm.id = modalId;

    const groupSurname = document.createElement("div");
    groupSurname.className = "inputGroup";
    groupSurname.innerHTML = '<span class="star starSurname">*</span>';

    const inputSurname = document.createElement("input");
    inputSurname.className = "modalInput inputSurname";
    inputSurname.classList.add("modalInputStar");
    inputSurname.id = "surname";
    inputSurname.type = "text";
    inputSurname.name = "surname";
    inputSurname.placeholder = "Фамилия";
    inputSurname.addEventListener("input", () => {
        if (inputSurname.value.trim() !== "") {
            document.querySelector(".starSurname").classList.add("d-none");
            document
                .querySelector(".inputSurname")
                .classList.remove("notValid");
        } else {
            document.querySelector(".starSurname").classList.remove("d-none");
            inputSurname.placeholder = "Фамилия";
        }
    });
    groupSurname.append(inputSurname);

    const groupName = document.createElement("div");
    groupName.className = "inputGroup";
    groupName.innerHTML = '<span class="star starName">*</span>';

    const inputName = document.createElement("input");
    inputName.className = "modalInput inputName";
    inputName.id = "name";
    inputName.type = "text";
    inputName.name = "name";
    inputName.placeholder = "Имя";
    inputName.addEventListener("input", () => {
        if (inputName.value.trim() !== "") {
            document.querySelector(".starName").classList.add("d-none");
            document.querySelector(".inputName").classList.remove("notValid");
        } else {
            document.querySelector(".starName").classList.remove("d-none");
            inputName.placeholder = "Имя";
        }
    });
    groupName.append(inputName);

    const groupLastName = document.createElement("div");
    groupLastName.className = "inputGroup";

    const inputLastName = document.createElement("input");
    inputLastName.className = "modalInput inputLastName";
    inputLastName.id = "lastName";
    inputLastName.type = "text";
    inputLastName.name = "lastName";
    inputLastName.placeholder = "Отчество";
    groupLastName.append(inputLastName);

    const addContact = document.createElement("div");
    addContact.className = "addContact";

    const addContactItems = document.createElement("div");
    addContactItems.className = "addContactItems";

    const addContactBtn = document.createElement("button");
    addContactBtn.className = "addContactBtn pointer";
    addContactBtn.textContent = "Добавить контакт";
    addContactBtn.type = "button";
    addContact.append(addContactItems, addContactBtn);

    const errorMessage = document.createElement("div");
    errorMessage.className = "errorMessage d-none";
    errorMessage.textContent =
        "Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!";

    const submitBtn = document.createElement("button");
    submitBtn.className = "submitBtn pointer";
    submitBtn.id = "clientCreate";
    submitBtn.textContent = "Сохранить";
    submitBtn.type = "submit";
    submitBtn.onclick = submitFormCreate;

    const cancel = document.createElement("div");
    cancel.className = "cancelOrRemove pointer";
    cancel.textContent = "Отменить";

    modalForm.append(
        groupSurname,
        groupName,
        groupLastName,
        addContact,
        errorMessage,
        submitBtn,
        cancel
    );

    modalContent.append(modalClose, modalTitle, modalForm);
    modal.append(modalContent);

    modalClose.addEventListener("click", () => {
        countCreateContact = 0;
        modal.remove();
    });

    addContactBtn.addEventListener("click", () => {
        ++countCreateContact;
        if (countCreateContact <= limit) {
            addContactItems.append(createContact());
        }
        if (countCreateContact >= 4) {
            addContactItems.classList.add("addContactItemsScroll");
        }
        if (countCreateContact === limit) {
            addContactBtn.classList.add("d-none");
        }
    });

    cancel.addEventListener("click", () => {
        countCreateContact = 0;
        modal.remove();
    });

    document.onclick = (e) => {
        if (e.target === document.getElementById("createModal")) {
            countCreateContact = 0;
            document.getElementById("createModal").remove();
        }
    };
    return modal;
}

/* Функция модального окна с формой для  изменения клиента */
function updateModalForm(modalId, title, payload) {
    const modal = document.createElement("div");
    modal.className = "modal d-none";
    modal.id = "updateModal";

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";

    const modalClose = document.createElement("div");
    modalClose.className = "modalClose";

    const modalTitle = document.createElement("h3");
    modalTitle.className = "modalTitle";
    modalTitle.textContent = title;

    const clientId = document.createElement("span");
    clientId.className = "clientId";
    clientId.textContent = `ID: ${payload.id}`;

    const modalForm = document.createElement("form");
    modalForm.className = "modalForm";
    modalForm.id = modalId;

    const inputClientId = document.createElement("input");
    inputClientId.className = "inputClientId";
    inputClientId.type = "text";
    inputClientId.name = "clientId";
    inputClientId.value = payload.id;

    const inputGroupFirst = document.createElement("div");
    inputGroupFirst.className = "inputGroup";

    const labelStar = '<div class="labelStar">*</div>';
    const labelSurname = document.createElement("label");
    labelSurname.className = "modalLabel labelSurname";
    labelSurname.textContent = "Фамилия";
    labelSurname.setAttribute("for", "surname");
    labelSurname.innerHTML += labelStar;

    const inputSurname = document.createElement("input");
    inputSurname.className = "modalInput inputSurname";
    inputSurname.id = "surname";
    inputSurname.type = "text";
    inputSurname.name = "surname";
    inputSurname.value = payload.surname;
    inputSurname.addEventListener("input", () => {
        if (inputSurname.value.trim() !== "") {
            document
                .querySelector(".inputSurname")
                .classList.remove("notValid");
        }
    });

    inputGroupFirst.append(labelSurname, inputSurname);

    const inputGroupSecond = document.createElement("div");
    inputGroupSecond.className = "inputGroup";

    const labelName = document.createElement("label");
    labelName.className = "modalLabel labelName";
    labelName.textContent = "Имя";
    labelName.setAttribute("for", "name");
    labelName.innerHTML += labelStar;

    const inputName = document.createElement("input");
    inputName.className = "modalInput inputName";
    inputName.id = "name";
    inputName.type = "text";
    inputName.name = "name";
    inputName.value = payload.name;

    inputGroupSecond.append(labelName, inputName);

    inputName.addEventListener("input", () => {
        if (inputSurname.value.trim() !== "") {
            document.querySelector(".inputName").classList.remove("notValid");
        }
    });

    const inputGroupThird = document.createElement("div");
    inputGroupThird.className = "inputGroup";

    const labelLastName = document.createElement("label");
    labelLastName.className = "modalLabel labelLastName";
    labelLastName.textContent = "Отчество";
    labelLastName.setAttribute("for", "lastName");

    const inputLastName = document.createElement("input");
    inputLastName.className = "modalInput inputLastName";
    inputLastName.id = "lastName";
    inputLastName.type = "text";
    inputLastName.name = "lastName";
    inputLastName.value = payload.lastName;
    inputGroupThird.append(labelLastName, inputLastName);

    const addContactItems = document.createElement("div");
    addContactItems.className =
        payload.contacts.length > 4
            ? "addContactLists addContactItemsScroll"
            : "addContactLists";

    payload.contacts.forEach((c) => {
        ++countUpdateModal;
        addContactItems.append(createContact(c));
    });

    const addContact = document.createElement("div");
    addContact.className = "addContact";

    const addContactBtn = document.createElement("button");
    addContactBtn.className = "addContactBtn pointer";
    addContactBtn.textContent = "Добавить контакт";
    addContactBtn.type = "button";
    addContact.append(addContactItems, addContactBtn);

    const errorMessage = document.createElement("div");
    errorMessage.className = "errorMessage d-none";
    errorMessage.textContent =
        "Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!";

    const submitBtn = document.createElement("button");
    submitBtn.className = "submitBtn pointer";
    submitBtn.id = "clientUpdate";
    submitBtn.textContent = "Сохранить";
    submitBtn.type = "submit";
    submitBtn.onclick = submitFormUpdate;

    const remove = document.createElement("div");
    remove.className = "cancelOrRemove pointer deleteClientLink";
    remove.id = payload.id;
    remove.textContent = "Удалить клиента";

    modalForm.append(
        inputClientId,
        inputGroupFirst,
        inputGroupSecond,
        inputGroupThird,
        addContact,
        errorMessage,
        submitBtn,
        remove
    );

    modalContent.append(clientId, modalClose, modalTitle, modalForm);
    modal.append(modalContent);

    modalClose.addEventListener("click", () => {
        countUpdateModal = 0;
        modal.remove();
    });

    addContactBtn.addEventListener("click", () => {
        ++countUpdateModal;
        if (countUpdateModal <= limit) {
            addContactItems.append(createContact());
        }
        if (countUpdateModal >= 4) {
            addContactItems.classList.add("addContactItemsScroll");
        }
        if (countUpdateModal === limit) {
            addContactBtn.classList.add("d-none");
        }
    });

    remove.addEventListener("click", () => {
        countUpdateModal = 0;
        wrapper.append(deleteClientModal("deleteClient", payload.id));
        modal.remove();
    });

    window.onclick = (e) => {
        if (e.target == document.getElementById("updateModal")) {
            countUpdateModal = 0;
            document.getElementById("updateModal").remove();
        }
    };

    return modal;
}

/* Функция ввода контакта */
function createContact(payload) {
    const contactWraper = document.createElement("div");
    contactWraper.className = "contactWraper";

    const contacts = [
        { type: "tel", value: "Доп. телефон" },
        { type: "email", value: "Email" },
        { type: "vk", value: "VK" },
        { type: "fb", value: "Facebook" },
    ];

    const selectArrow = document.createElement("button");
    selectArrow.className = "selectArrowDown";

    const selectWraper = document.createElement("div");
    selectWraper.className = "selectWraper";

    const select = document.createElement("div");
    select.className = "select";
    select.textContent = payload?.type || "Телефон";

    const selectLists = document.createElement("ul");
    selectLists.className = "selectLists d-none";

    const inputContact = document.createElement("input");
    inputContact.className = "inputContact";
    inputContact.name = payload?.type || "tel";
    inputContact.type = "text";
    inputContact.placeholder = "Введите данные";
    inputContact.value = payload?.value || null;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.type = "button";

    // Удаление select + input при нажатии на кнопку с круглым крестиком
    deleteBtn.addEventListener("click", () => {
        if (countCreateContact > 0) {
            --countCreateContact;
        }
        if (countUpdateModal > 0) {
            --countUpdateModal;
        }
        document.querySelector(".addContactBtn ").classList.remove("d-none");
        contactWraper.remove();
    });

    select.addEventListener("click", () => {
        selectLists.classList.toggle("d-none");
        selectArrow.classList.toggle("selectArrowUp");
    });

    select.addEventListener("mouseenter", () => {
        selectLists.classList.remove("d-none");
        selectArrow.classList.add("selectArrowUp");
    });

    selectWraper.addEventListener("mouseenter", () => {
        selectLists.classList.remove("d-none");
        selectArrow.classList.add("selectArrowUp");
    });

    selectWraper.addEventListener("mouseleave", () => {
        selectLists.classList.add("d-none");
        selectArrow.classList.remove("selectArrowUp");
    });

    selectLists.addEventListener("click", () => {
        selectLists.classList.add("d-none");
        selectArrow.classList.remove("selectArrowUp");
    });

    selectLists.addEventListener("mouseleave", () => {
        selectLists.classList.add("d-none");
        selectArrow.classList.remove("selectArrowUp");
    });

    inputContact.addEventListener("input", () => {
        if (inputContact.value.trim() !== "") {
            document.querySelector(".errorMessage").classList.add("d-none");
            document.querySelector(".errorMessage").textContent = "";
        }
    });

    contacts.forEach((c) => {
        const li = document.createElement("li");
        li.className = "selectListsItem";
        li.id = c.type;
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
wrapper.append(headScreen);

/* Функция для создания спинера загрузки данных */
function createSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const spinnerIcon = document.createElement("div");
    spinnerIcon.className = "spinnerIcon";

    spinner.appendChild(spinnerIcon);

    return spinner;
}

/* Функция для показа скрытых контактов */
function toggleElements(parentElement) {
    const elementsToToggle = parentElement.querySelectorAll(".hidden-element");

    elementsToToggle.forEach((element) => {
        if (element.classList.contains("d-none")) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
}

// Функция для сортировки элементов таблицы
const sortItems = (order) => {
    const divTBody = document.querySelector(".divTBody");
    // Создаем массив из элементов
    const items = Array.from(divTBody.children);

    items.sort((a, b) => {
        if (a && b) {
            const textA = a.textContent || "";
            const textB = b.textContent || "";

            if (order === "asc") {
                return textA.localeCompare(textB);
            } else if (order === "desc") {
                return textB.localeCompare(textA);
            } else if (order === "reverse") {
                return -1;
            }
        }
        return 0;
    });

    divTBody.innerHTML = "";

    items.forEach((item, index) => {
        if (index === 0) {
            // contactInfoWrapperDown
            Array.from(item.children[4].children).forEach((contact) => {
                Array.from(contact.children[0].classList).map((item) => {
                    if (!item.includes("toggleBtnContent")) {
                        contact.children[0].classList.remove(
                            "contactInfoWrapper"
                        );
                        contact.children[0].classList.add(
                            "contactInfoWrapperDown"
                        );
                    }
                });
            });
            divTBody.appendChild(item);
        } else {
            Array.from(item.children[4].children).forEach((contact) => {
                Array.from(contact.children[0].classList).map((item) => {
                    if (!item.includes("toggleBtnContent")) {
                        contact.children[0].classList.remove(
                            "contactInfoWrapperDown"
                        );
                        contact.children[0].classList.add("contactInfoWrapper");
                    }
                });
            });
            divTBody.appendChild(item);
        }
    });
};

let sortDirections = [1, 0, 0, 0]; // Устанавливаем активную сортировку по ID

window.onload = function () {
    document
        .querySelector(".idCol")
        .children[0].classList.add("divTHeaderArrowUp");
    sortItems("reverse"); // Вызываем сортировку по ID при загрузке страницы

    // Метод для searchInput
    let searchInput = document.querySelector(".navSearchFormInput");
    let timeoutId;

    searchInput.addEventListener("input", function () {
        clearTimeout(timeoutId); // Очищаем предыдущий таймаут
        let searchText = this.value.toLowerCase();

        // Устанавливаем новый таймаут для отображения данных через 300 миллисекунд
        timeoutId = setTimeout(function () {
            let rows = document.getElementsByClassName("divTBodyItem");
            for (let i = 0; i < rows.length; i++) {
                let rowData = rows[i].textContent.toLowerCase();
                if (rowData.includes(searchText)) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }, 300);
    });
};

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

/* Получаем данные с backend */
function getClients() {
    fetch("http://localhost:3000/api/clients")
        .then((response) => response.json())
        .then((data) => {
            const divTable = document.getElementById("clientTabel");
            const divTBody = divTable.getElementsByClassName("divTBody")[0];

            if (Object.keys(data).length === 0) {
                divTBody.append(createSpinner());
                return;
            }

            // Очищаем содержимое divTBody перед добавлением данных
            divTBody.innerHTML = "";

            // Добавляем строки с данными в таблицу
            data.forEach((item) => {
                divTBody.appendChild(createDivTBodyItem(item));
            });
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
            divTBody.append(createSpinner());
        });
}

/* Сохраняем данные в backend */
function submitFormCreate(e) {
    e.preventDefault();
    // Поиск формы
    const form = document.querySelector("#createClient");
    const inputs = form.querySelectorAll("input");

    let formData = {};
    let contacts = [];
    inputs.forEach((input) => {
        switch (input.name) {
            case "lastName":
                formData[input.name] = input.value;
                break;
            case "name":
                formData[input.name] = input.value;
                break;
            case "surname":
                formData[input.name] = input.value;
                break;

            default:
                contacts.push({ type: input.name, value: input.value });
                break;
        }
    });
    formData["contacts"] = contacts;
    formData["createdAt"] = Date.now();
    formData["updatedAt"] = Date.now();
    createClient(formData);
}

function createClient(clientData) {
    fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Обработка полученного ответа
            const surname = document.querySelector("#surname");
            const name = document.querySelector("#name");
            const starSurname = document.querySelector(".starSurname");
            const starName = document.querySelector(".starName");
            const errorMessage = document.querySelector(".errorMessage");
            if (data.errors) {
                console.log(data.errors);
                data.errors.map((err) => {
                    switch (err.field) {
                        case "surname":
                            surname.classList.add("notValid");
                            surname.placeholder = err.message;
                            starSurname.classList.add("d-none");
                            break;
                        case "name":
                            name.classList.add("notValid");
                            name.placeholder = err.message;
                            starName.classList.add("d-none");
                            break;
                        case "contacts":
                            errorMessage.classList.remove("d-none");
                            errorMessage.textContent = err.message;
                            break;

                        default:
                            break;
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Ошибка при отправке данных:", error);
            const errors = document.querySelector(".errorMessage");
            errors.classList.remove("d-none");
            errors.textContent = error;
        });
}

/* Функция вызова модального окна для изменения данных */
const clientTabel = document.querySelector("#clientTabel");

const handleEditBtn = (e) => {
    const clickedButton = e.target; // Целевой элемент, на который было нажатие
    const clickedRow = clickedButton.parentNode.parentNode; // Родительская строка, содержащая кнопку
    const rowData = Array.from(clickedRow.children).map(
        (cell) => cell.textContent
    ); // Значения ячеек строки
    return {
        id: rowData[0],
        btn: clickedButton,
        icon: clickedButton.children[0],
    };
};

clientTabel.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEdit")) {
        const data = handleEditBtn(e);
        getClientById(data);
    }
});

/* Получаем client по id с backend */
function getClientById({ id, btn, icon }) {
    fetch(`http://localhost:3000/api/clients/${id}`)
        .then((response) => response.json())
        .then((data) => {
            btn.classList.add("btnEditPending");
            icon.className = "btnEditPendingIcon";

            // Имитация задержки получения данных
            setTimeout(() => {
                btn.classList.remove("btnEditPending");
                icon.className = "btnEditIcon";
                const modal = updateModalForm(
                    "updateClient",
                    "Изменить данные",
                    data
                );
                modal.classList.remove("d-none");
                wrapper.append(modal);
            }, 1000);
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        });
}

// Измеяем данные клиента
function submitFormUpdate(e) {
    e.preventDefault();
    // Поиск формы
    const form = document.querySelector("#updateClient");
    const inputs = form.querySelectorAll("input");

    let formData = {};
    let contacts = [];
    let clientId = "";
    inputs.forEach((input) => {
        switch (input.name) {
            case "clientId":
                clientId = input.value;
                break;
            case "lastName":
                formData[input.name] = input.value;
                break;
            case "name":
                formData[input.name] = input.value;
                break;
            case "surname":
                formData[input.name] = input.value;
                break;

            default:
                contacts.push({ type: input.name, value: input.value });
                break;
        }
    });
    formData["contacts"] = contacts;
    formData["updatedAt"] = Date.now();
    updateClient(clientId, formData);
}

function updateClient(id, clientData) {
    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Обработка полученного ответа
            console.log(data); // Вывод данных в консоль
            // Дальнейшая обработка ответа
            const surname = document.querySelector("#surname");
            const name = document.querySelector("#name");
            const errorMessage = document.querySelector(".errorMessage");
            if (data.errors) {
                data.errors.map((err) => {
                    switch (err.field) {
                        case "surname":
                            surname.classList.add("notValid");
                            surname.placeholder = err.message;
                            break;
                        case "name":
                            name.classList.add("notValid");
                            name.placeholder = err.message;
                            break;
                        case "contacts":
                            errorMessage.classList.remove("d-none");
                            errorMessage.textContent = err.message;
                            break;

                        default:
                            break;
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Ошибка при отправке данных:", error);
            const errors = document.querySelector(".errorMessage");
            errors.classList.remove("d-none");
            errors.textContent = error;
        });
}

// Для удаления клиента
const handleDeleteBtn = (e) => {
    const clickedButton = e.target; // Целевой элемент, на который было нажатие
    const clickedRow = clickedButton.parentNode.parentNode; // Родительская строка, содержащая кнопку
    const rowData = Array.from(clickedRow.children).map(
        (cell) => cell.textContent
    ); // Значения ячеек строки

    return rowData[0];
};

clientTabel.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnRemove")) {
        const clientId = handleDeleteBtn(e);
        const modal = deleteClientModal("deleteClient", clientId);
        modal.classList.remove("d-none");
        wrapper.append(modal);
    }
});

function deleteClientModal(modalId, clientId) {
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
    modalForm.id = modalId;

    const inputClientId = document.createElement("input");
    inputClientId.className = "modalInputDeleted";
    inputClientId.id = "clientId";
    inputClientId.type = "text";
    inputClientId.name = "clientId";
    inputClientId.value = clientId;

    const submitBtn = document.createElement("button");
    submitBtn.className = "submitBtn pointer";
    submitBtn.id = "deleteModalBtn";
    submitBtn.textContent = "Удалить";
    submitBtn.type = "submit";
    submitBtn.onclick = submitFormDelete;

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
            document.getElementById("deleteModal").remove();
        }
    };
    return modal;
}

// Удаляем данные клиента
function submitFormDelete(e) {
    e.preventDefault();
    const form = document.querySelector("#deleteClient");
    console.log(form.elements["clientId"]);
    const clientId = form.elements["clientId"].value;
    console.log(clientId);
    deleteClient(clientId);
}

function deleteClient(id) {
    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при удалении клиента");
            }
            // Обработка успешного удаления
            console.log("Клиент успешно удален");
        })
        .catch((error) => {
            console.error("Ошибка при удалении клиента:", error);
            const errors = document.querySelector(".errorMessage");
            errors.classList.remove("d-none");
        });
}

// Получаем все заголовки таблицы
const headersTable = document.querySelectorAll("#divTHeader");

// Добавьте обработчик события для каждого заголовка
headersTable.forEach((header, index) => {
    if (index < 4) {
        header.addEventListener("click", () => {
            // Удалите класс "active" у всех заголовков таблицы
            headersTable.forEach((h) => {
                h.classList.remove("divTHeaderActive");
            });

            // Добавьте класс "active" только выбранному заголовку
            header.classList.add("divTHeaderActive");
        });
    }
});
