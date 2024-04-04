const getData = async (page_data, start_index, end_index) => {
    let list = "<tr><th>Id</th><th>Slug</th><th>URL</th><th>Title</th><th>Content</th><th>Image</th><th>Thumbnail</th><th>Status</th><th>Category</th><th>PublishedAt</th><th>UpdatedAt</th><th>UserId</th><th>Comments</th></tr>";

    page_data.slice(start_index, end_index).map((item) => {
        list += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.slug}</td>
                    <td>${item.url}</td>
                    <td>${item.title}</td>
                    <td style="text-align: justify; text-justify: inter-word;">${item.content.slice(0, 150)}</td>
                    <td><img src="${item.image}" width="150px" height="100px"/></td>
                    <td><img src="${item.thumbnail}" width="150px" height="100px"/></td>
                    <td>${item.status}</td>
                    <td>${item.category}</td>
                    <td>${item.publishedAt}</td>
                    <td>${item.updatedAt}</td>
                    <td>${item.userId}</td>
                    <td>
                        <form action="comment">
                            <input type="hidden" name="postId" value="${item.id}">
                            <input type="submit" value="comment">
                        </form>
                    </td>
                </tr>`

    })
    console.log("2");
    return document.getElementById("users").innerHTML = list;

}

const length_rec = async (url) => {
    try {
        let response = await fetch(url);
        let data = await response.json();
        let total_rec = data.length;
        return total_rec;
    } catch (error) {
        console.log(error);
    }
}

const pagination = async () => {
    let response = await fetch("https://jsonplaceholder.org/posts");
    let filteredData = await response.json();
    let total_rec = await length_rec("https://jsonplaceholder.org/posts");

    let limit = 10;
    let pages = Math.ceil(total_rec / limit);

    let value = 1;
    let prev = document.getElementById("previouspage");
    let next = document.getElementById("nextpage");
    let first = document.getElementById("firstpage");
    let last = document.getElementById("lastpage");
    let curpage = document.getElementById("curpage");
    let srch = document.getElementById("srch");

    await getData(filteredData, (limit * value) - limit, (limit * value));

    const check = () => {
        prev.style.opacity = "1";
        prev.disabled = false;
        first.style.opacity = "1";
        first.disabled = false;
        next.style.opacity = "1";
        next.disabled = false;
        last.style.opacity = "1";
        last.disabled = false;
        if (value == 0) {
            prev.style.opacity = "0.5";
            prev.disabled = true;
            first.style.opacity = "0.5";
            first.disabled = true;
            next.style.opacity = "0.5";
            next.disabled = true;
            last.style.opacity = "0.5";
            last.disabled = true;
        }
        if (value == 1) {
            prev.style.opacity = "0.5";
            prev.disabled = true;
            first.style.opacity = "0.5";
            first.disabled = true;
        }

        if (value == pages) {
            next.style.opacity = "0.5";
            next.disabled = true;
            last.style.opacity = "0.5";
            last.disabled = true;
        }
    }


    const pre = async () => {
        if (value > 1 && value <= pages) {
            --value;
            check();
            await getData(filteredData, (limit * value) - limit, (limit * value));
            curpage.innerText = value;
            return value;
        }

    }

    const nex = async () => {
        if (value >= 1 && value < pages) {
            ++value;
            check();
            await getData(filteredData, (limit * value) - limit, (limit * value));
            curpage.innerText = value;
            return value;
        }

    }

    const firstpg = async () => {
        value = 1;
        check();
        console.log(value);
        await getData(filteredData, (limit * value) - limit, (limit * value));

        curpage.innerText = value;

        return value;
    }

    const lastpg = async () => {
        value = pages;
        check();
        await getData(filteredData, (limit * value) - limit, (limit * value));
        curpage.innerText = value;
        return value;

    }



    const search_value = async () => {
        let response = await fetch("https://jsonplaceholder.org/posts");
        let data = await response.json();
        let srch_data = document.getElementById("search");
        console.log(srch_data);
        let search = srch_data.value.toLowerCase();
        console.log(search);
        let filteredData = data.filter((ele) =>
            ele.id == search ||
            ele.userId == search ||
            ele.slug.toLowerCase().includes(search) ||
            ele.title.toLowerCase().includes(search) ||
            ele.category.toLowerCase().includes(search) ||
            ele.publishedAt.toLowerCase().includes(search) ||
            ele.updatedAt.toLowerCase().includes(search)
        )
        console.log(filteredData);
        await getData(filteredData, (limit * value) - limit, (limit * value));

    }
    prev.addEventListener("click", pre);

    next.addEventListener("click", nex);

    first.addEventListener("click", firstpg);

    last.addEventListener("click", lastpg);

    srch.addEventListener("click", search_value);
}

pagination();

