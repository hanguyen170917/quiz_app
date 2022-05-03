const animals = [
  {
    id: 1,
    type: "dog",
    weight: 15,
  },
  {
    id: 2,
    type: "cat",
    weight: 4,
  },
  {
    id: 3,
    type: "lion",
    weight: 300,
  },
  {
    id: 4,
    type: "elephant",
    weight: 3000,
  },
];

/**
 * Lấy ra danh sách loại những con vật:
 *  - ["dog", "cat", "lion", "elephant"]
 */

// Cách 1
// const animalTypes = [];
// for (let i = 0; i < animals.length; i++) {
//   const animal = animals[i];
//   animalTypes.push(animal.type);
// }

// Cách 2
const animalTypes = animals.map((animal, index, array) => {
  //   console.log("Index", index, "value", animals[index]);
  //   console.log("Index", index, "value", array[index]);
  return animal.type;
});

console.log(animalTypes);

/**
 * Chuyển object trong array animals thành đối tượng Animals
 */
class Animal {
  constructor(id, type, weight) {
    this.id = id;
    this.type = type;
    this.weight = weight;
  }

  eat(food) {
    console.log(`${this.type} eating ${food}`);
  }
}

const animalIntances = animals.map((animal) => {
  // dùng destructuring để bóc tách object
  const { id, type, weight } = animal;
  // new Animal
  return new Animal(id, type, weight);
});

console.log(animals);
console.log(animalIntances);

/**
 * Cập nhật số kg của lion (id: 3) thành 500
 */
const id = 3;
// let idx = 0;
for (let i = 0; i < animals.length; i++) {
  if (animals[i].id === id) {
    // idx = i;
    animals[i] = { id: 3, type: "lion", weight: 500 };
  }
}

console.log(animals);

const updateAnimals = animals.map((animal) => {
  // chỉ thay đổi duy nhất 1 phần tử khớp với điều kiện
  if (animal.id === id) {
    //  Sử dụng spread operator để sao chép giá trị object
    return { ...animal, weight: 500 };
    // {id: 3, type: "lion", weight: 300, weight: 500}
  }
  return animal; // K thay đổi gì hết
});

console.log(updateAnimals);

/**
 * Filter
 * Lọc ra những con vật có khối lượng lớn hơn 1000kg
 */
const animals1000 = animals.filter((animal) => {
  return animal.weight > 1000;
});

console.log("Danh sách con vật lớn hơn 1000kg:", animals1000);

// Xoá phần tử có id: 2 và trả ra 1 array mới
const deleteId = 2;
const deleteAnimals = animals.filter((animal) => {
  // Giữ lại những con vật có id khác id muốn xoá
  return animal.id !== deleteId;
});
console.log("Danh sách những con vật còn lại sau khi xoá:", deleteAnimals);

/**
 * Tính tổng cân nặng của tất cả con vật
 */
/**
 * Đầu vào là 1 array, đầu ra là 1 [number, string ] thì dùng reduce
 */
const totalWeight = animals.reduce((result, animal) => {
  return result + animal.weight;
}, 0);
// Lần 1: result = 0, animal.weight = 15 => 0 + 15 = 15;
// Lần 2: result = 15, animal.weight = 4 => 0 + 15 = 19;
// Lần 3: result = 19, animal.weight = 500 => 19 + 500 = 519;
// Lần 4: result = 519, animal.weight = 3000 => 519 + 3000 = 3519;

console.log("Tổng cân nặng của các con vật:", totalWeight);

// Tạo 1 giao diện HTML từ mảng animals
const html = animals.reduce((result, animal) => {
  return (
    result +
    `
        <tr>
            <td>${animal.id}</td>
            <td>${animal.type}</td>
            <td>${animal.weight}</td>
        </tr>
    `
  );
}, "");

console.log("Animal Rows", html);
