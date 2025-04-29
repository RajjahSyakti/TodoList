var ambilData = document.getElementById("ambilData");

// fungsi untuk merender data ke table
function tampilkanData() {
  ambilData.innerHTML = "";
  var data = JSON.parse(localStorage.getItem("tasks")) || [];

  data.forEach((item, index) => {
    const row = ambilData.insertRow();
    const namaTugas = row.insertCell();
    const tanggalDibuat = row.insertCell();
    const aksi = row.insertCell();

    namaTugas.textContent = item.namatugas;
    tanggalDibuat.textContent = item.tanggaldibuat;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "hapus";
    tombolHapus.classList.add("tombol-hapus");
    tombolHapus.addEventListener("click", function () {
      hapusTugas(index);
    });
    aksi.appendChild(tombolHapus);
  });
}

//function hapus data
function hapusTugas(index) {
  let data = JSON.parse(localStorage.getItem("tasks")) || [];
  data.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(data));
  tampilkanData();
}

// ketika tombol di klik
var tombolKirim = document
  .getElementById("tombolKirim")
  .addEventListener("click", function () {
    var waktuSekarang = new Date();
    var tanggal = waktuSekarang.toISOString().slice(0, 10);
    var inputTugas = document.getElementById("namaTugas").value;

    if (inputTugas.trim() === "") return;

    var dataRegist = {
      namatugas: inputTugas,
      tanggaldibuat: tanggal,
    };

    var tugasBaru = JSON.parse(localStorage.getItem("tasks")) || [];

    var sudahAda = tugasBaru.some(
      (item) => item.namatugas.toLowerCase() === inputTugas.toLowerCase()
    );
    if (sudahAda) {
      alert("Tugas dengan nama yang sama sudah ada!");
      return;
    }

    tugasBaru.push(dataRegist);
    localStorage.setItem("tasks", JSON.stringify(tugasBaru));
    tampilkanData();
    inputTugas.value = "";
  });

tampilkanData();
