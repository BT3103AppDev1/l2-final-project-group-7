  <template>
    <div>
      <div id="kanban">
        <div class="cards">
          <div
            v-for="column in columns"
            :key="column.id"
            class="col"
          >
            <div class="col-header">
              <p class="col-name">{{column.name}}</p>
              <div class="options">
                <CIcon class="plus-icon" :icon="cilPlus" size="sm" @click.prevent="showModal(column)"/>
                <CIcon class="trash-icon" :icon="cilTrash" size="sm" @click.prevent="deleteList(column)"/>
              </div>

            </div>
            <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                <draggable
                :list="column.tasks"
                item-key="id"
                class="list-group"
                ghost-class="ghost-card"
                group="tasks"
                ref="listRef"
                :animation="200"
                @change="onChange(column, $event)"
                :emptyInsertThreshold="100"
                >
                <template #item="{element}">
                    <kanban-card
                    :task="element"
                    class="card"
                    ></kanban-card>
                </template>
                </draggable>
          </div>
        </div>
        <KanbanCreateList @create-list="createList" />
      </div>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal">
                  <template v-slot:header>
                    Add Card
                  </template>
                  <template v-slot:body>
                    <form>
                      <div class="addproject-addprojtitle">
                  <div class="addproject-projtitletext">Card title:</div>
                  
                    <input type="text" class="addproject-inputbg" placeholder="Card title..." id="newProjName" v-model="taskName" required>
                  </div>
                  <div class="addproject-addprojtitle">
                  <div class="addproject-projtitletext">Due Date:</div>
                    <input type="date" class="addproject-inputbg" id="newProjName" v-model="endDate">
                  </div>
                  <div class="addproject-addprojtitle">
                  <div class="addproject-projtitletext">Description</div>
                    <textarea class="addproject-inputbg" id="newProjName" v-model="about"></textarea>
                  </div>
                  
                  <div class="addproject-adduser">
                    <div class="addproject-userstext">Stakeholders:</div>
                  
                    <input type="text" class="addproject-inputbg" placeholder="Username" id="newUsers" v-model="stakeHolderEmail">
                    <input type='button' class="addproj-adduser-btn" value='Add user' id='add' @click="addStakeholder">
                    <div>
                      {{ formattedStakeHolders }}
                    </div>
                </div> 
                <div class="addproject-addprojtitle">
                  <div class="addproject-projtitletext">Color:</div>
                  <div class="color-picker">
                    <div
                      v-for="color in colorOptions"
                      :key="color"
                      :style="{ backgroundColor: color }"
                      :class="{ 'color-swatch': true, 'selected': isSelectedColor(color) }"
                      @click="cardColor = color"
                    ></div>
                  </div>
                </div>
              </form>
              </template>
              <template v-slot:footer>
                <div class="addproject-pushbuttons">
                  <button class="addproject-addbutton" @click.prevent="addCard">Add Card</button>
                </div>
              </template>
            </Modal>

  </template>
  
  <script>
  import { collection, getDocs, getFirestore, doc, addDoc, deleteDoc, updateDoc, Timestamp, query, where, setDoc} from "firebase/firestore"
  import { auth, db } from "../../firebase/init.js"
  import { getAuth, onAuthStateChanged } from "@firebase/auth";
  import KanbanCard from "./KanbanCard.vue";
  import draggable from "vuedraggable";
  import KanbanCreateList from "./KanbanCreateList.vue";
  import Modal from "../Modal.vue"
  import { useLists } from "./KanbanAPI";
  import { CIcon } from '@coreui/icons-vue';
  import { cilPlus, cilTrash } from '@coreui/icons'; 

  export default {
    name: "KanbanBoard",
    display: "Simple",
    order: 0,
    components: {
        draggable,
        KanbanCard,
        KanbanCreateList,
        Modal,
        CIcon
    },
    data() {
    return {
      isModalVisible : false,
      taskName: "",
      endDate: new Date(),
      selectedList: null,
      clickedTask: "",
      listFrom: "",
      listTo: "",
      about: "",
      stakeHolderEmail: "",
      stakeHolderArrayEmail: [],
      stakeHolderArrayID: [],
      columns: useLists(this.$route.params.projID),
      cardColor: "#ffffff",
      colorOptions: [
        "#D3D3D3", // light gray
        "#C0C0C0", // silver
        "#B0C4DE", // light steel blue
        "#D8BFD8", // thistle
        "#F08080", // light coral
        "#FFA07A", // light salmon
        "#CD5C5C", // indian red
        "#8FBC8F", // dark sea green
        "#00CED1", // dark turquoise
        "#FFDAB9", // peach puff
        "#FFD700", // gold
      ]

    };
  },
    setup() {
      return {
        cilPlus, 
        cilTrash, 
      }
    },
    computed: {
      formattedStakeHolders() {
        return this.stakeHolderArrayEmail.join(", ")
      },
      isSelectedColor() {
        return (color) => {
        return this.cardColor === color;
      };
  },
    },
    methods: {
      async addCard() {
        const auth = getAuth();
        const taskCollectionRef = collection(db, `lists/${this.selectedList.id}/tasks`);
        const firebaseDate = Timestamp.fromDate(new Date(this.endDate));
        this.stakeHolderArrayID.push(auth.currentUser.uid)
        const taskDoc = {
          listID: this.selectedList.id, // use the selected list to set the listID property
          taskName: this.taskName,
          endDate: firebaseDate,
          completed: false,
          about: this.about,
          stakeHolderArrayID: this.stakeHolderArrayID,
          stakeHolderArrayEmail: this.stakeHolderArrayEmail,
          projID: this.$route.params.projID,
          cardColor: this.cardColor,
        };
        const docRef = await addDoc(taskCollectionRef, taskDoc); 
        await setDoc(doc(db, "tasks", docRef.id), taskDoc)
        console.log("card added");
        this.taskName = "";
        this.endDate = new Date();
        this.selectedList = null;
        this.isModalVisible = false;
        this.about = "";
        this.stakeHolderArrayEmail = [];
        this.stakeHolderArrayID = [];
      },
      showModal(list) {
        this.isModalVisible = true; 
        this.selectedList = list
      },
      closeModal() {
        this.isModalVisible = false;
        this.taskName = "";
      },
      async deleteList(column) {
        const collectionRef = collection(db, "lists");
        const listDoc = doc(collectionRef, column.id);
        const taskCollection = collection(db, `lists/${column.id}/tasks`)
        const tasksDocs = await getDocs(taskCollection, column.id)
        tasksDocs.forEach(taskDoc => {
          const document = doc(taskCollection, taskDoc.id)
          deleteDoc(document); 
        })
        const tasksCollectionRef = collection(db, "tasks");
        const taskQuery = query(collection(db, "tasks"), where("listID", "==", column.id));

        const mainTasksDocs = await getDocs(taskQuery)
        mainTasksDocs.forEach(taskDoc => {
          const document = doc(tasksCollectionRef, taskDoc.id)
          deleteDoc(document); 
        })
        await deleteDoc(listDoc);
      },
      async addStakeholder() {
        const userQuery = query(collection(db, 'users'), where("email", "==", this.stakeHolderEmail));
        const querySnapshot = await getDocs(userQuery);
        const stakeholder = querySnapshot.docs[0];
        if (stakeholder) {
          this.stakeHolderArrayID.push(stakeholder.data().uid)
          this.stakeHolderArrayEmail.push(this.stakeHolderEmail);
        }
        this.stakeHolderEmail = "";
      },
      async onChange(column, e) {
        if (e.added) {
          const addedItem = e.added.element;
          const auth = getAuth();
          const newColumn = column
          const taskCollectionRef = collection(db, `lists/${newColumn.id}/tasks`);
          const taskDoc = {
            listID: newColumn.id, // use the selected list to set the listID property
            taskName: addedItem.taskName,
            endDate: addedItem.endDate,
            completed: addedItem.completed,
            about: addedItem.about,
            stakeHolderArrayID: addedItem.stakeHolderArrayID,
            stakeHolderArrayEmail: this.stakeHolderArrayEmail
          };
          const docRef = await addDoc(taskCollectionRef, taskDoc);
          console.log("card dragged!")
        }

        if (e.removed) {
          const removedItem = e.removed.element;
          const auth = getAuth();
          const taskCollectionRef = collection(db, `lists/${removedItem.listID}/tasks`);
          const taskDocument = doc(taskCollectionRef, removedItem.id);
          await deleteDoc(taskDocument);
        }
      }
    }
  };
  </script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
* {
  font-family: 'Josefin Sans', sans-serif;
}
#kanban {
    display: flex; 
    width: 100vw; 
    min-height: 100vh; 
    padding-left: 1rem;
}

.cards {
    display: flex; 
    padding-bottom: 3rem; 
    min-height: 100vh; 
}

.col {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem; 
    padding-left: 0.75rem;
    padding-right: 0.75rem; 
    margin-right: 1rem; 
    background-color: #F3F4F6; 
    border-radius: 0.25rem; 
    border-radius: 0.5rem;
    min-width: 295px;
}

.col-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


.col-title {
    color: #374151; 
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem; 
    font-weight: 600; 
    letter-spacing: 0.025em; 
}
.col-name {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem; 
  padding-left: 0.75rem;
  padding-right: 0.75rem; 
}

.add-card-button {
    border: none;
    background-color: #b5b9c0;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem; 
    padding-left: 0.75rem;
    padding-right: 0.75rem; 
    cursor: pointer;
}

.options {
  display: flex;
  flex-direction: row;
}
.plus-icon {
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem; 
  padding-left: 0.75rem;
  padding-right: 0.75rem; 
  cursor: pointer;
}
.trash-icon {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem; 
  padding-left: 0.75rem;
  padding-right: 0.75rem; 
  border-radius: 0.5rem;
  cursor: pointer;
}



.list-group-item {
    display: flex; 
    padding: 1rem; 
    margin-bottom: 0.75rem; 
    background-color: #ffffff; 
    justify-content: space-between; 
    align-items: center; 
    border-radius: 0.5rem; 
    cursor: move; 
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
}

.card {
    margin-top: 0.75rem; 
    cursor: move; 
}

.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}

input {
    text-indent: 8px;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  padding-right: 1rem;
  
}
textarea.addproject-inputbg {
  border: none;
  background-color: #edf2f7;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5rem;
}
.color-picker {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 4px;
  margin-bottom: 4px;
}

.selected {
  width: 17px;
  height: 17px;
  border: 2px solid #000;
}
</style>