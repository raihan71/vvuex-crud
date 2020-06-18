<template>
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Users Table</h4>
          <p class="category">Latest data goes in first row. Sorted by date:'desc'</p>
        </md-card-header>
        <md-card-content>
          <md-table :table-header-color="tableHeaderColor">
            <md-table-row>
              <md-table-head
                v-for="(column, index) in columns"
                :key="index">
                {{column | capitalize }}
              </md-table-head>
              <md-table-head>Action</md-table-head>
            </md-table-row>
            <md-table-row
              v-for="(item, index) in items" :key="index">
              <md-table-cell
                v-for="(column, indexColumn) in columns"
                  :key="indexColumn">
                  {{item[column]}}
              </md-table-cell>
              <md-table-cell>
                <md-button
                  class="md-just-icon md-simple md-primary"
                  @click="handleClickEdit(item)">
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="top">Edit</md-tooltip>
                </md-button>
                <md-button
                  class="md-just-icon md-simple md-danger"
                  @click="handleClickDelete(item)">
                  <md-icon>delete</md-icon>
                  <md-tooltip md-direction="top">Delete</md-tooltip>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
</template>

<script>
export default {
  name: "user-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default(){
        return [];
      }
    },
    columns: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  methods: {
    handleClickEdit(item){
      this.$emit('edit', item);
    },
    handleClickDelete(item){
      this.$emit('delete', item);
    }
  }
};
</script>
