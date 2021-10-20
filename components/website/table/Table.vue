<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="shadow-md overflow-hidden border-b bg-white border-gray-200 sm:rounded-lg">
          <div v-show="isPageGovernment" class="px-6 py-4 flex flex-nowrap">
            <div class="flex flex-col flex-nowrap mr-2">
              <label class="flex-grow">Enter a Github Issue ID</label>
              <input 
                @input="$emit('githubUserEntry', $event)" 
                v-model="githubIssueId" 
                placeholder="42" 
                class="py-2 px-4 border-2 w-full rounded-md" 
                />
            </div>
          </div>
          <table class="min-w-full divide-y divide-gray-200 border-collapse">
            <thead class="bg-white">
              <tr>
                <th
                  @click="sort(column.attribute)"
                  v-for="(column, index) in columns" 
                  :key="index"
                  scope="col" 
                  class="px-6 py-3 text-left text-intxt font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex flex-nowrap cursor-pointer">
                    <!-- Commented out Sorting option until we add it to the official list of tasks -->
                    <!--<div class="self-center mr-2" v-show="currentSort === column.attribute">
                      <SortedAscIcon v-if="currentSortDir === 'asc'" class="h-4 w-4 text-blue-400" />
                      <SortedDescIcon v-else class="h-4 w-4 text-blue-400" />
                    </div>-->
                    {{ column.name }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="sortedItems.length" class="divide-y divide-gray-200 text-intxt">
              <tr v-for="(item, i) in sortedItems" :key="i" class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td 
                  v-for="(textColumn, j) in textColumns" 
                  :key="j" 
                  :data-label="textColumn.attribute"
                  class="w-full lg:w-auto px-6 py-4">
                  <div class="flex-shrink-0 break-all">
                    <a 
                      v-if="textColumn.attribute === 'githubIssueId'"
                      :href="`https://github.com/thenewboston-developers/Projects/issues/${item[textColumn.attribute]}`"  
                      rel="noreferrer noopener"
                      target="_blank"
                      class="text-blue-800 underline">
                    {{ item[textColumn.attribute] }}
                    </a>
                    <span v-else>
                      {{ item[textColumn.attribute] }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="divide-y divide-gray-200 text-intxt">
              <tr class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td 
                  class="w-full lg:w-auto px-6 py-4">
                  <div class="flex-shrink-0">
                    Seems like there aren't any transactions for this query.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between flex-wrap md:justify-end w-full">
              <div class="md:mr-6 flex-grow">
                <p class="text-sm text-gray-700">
                  Total
                  <span class="font-medium">{{ options.total }}</span>
                  results
                </p>
              </div>
              <div class="md:mr-6 text-sm text-gray-700">
              Show 
              <select 
                class="border-2 p-2 rounded-lg w-20" 
                v-model="maxItemsPerPage"
                @change="$emit('changedMaxItems', maxItemsPerPage)">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>30</option>
              </select>
               Items
              </div>
              <div v-if="notEnoughPages">
                <nav class="relative z-0 inline-flex" aria-label="Table pagination">
                  <a
                    v-show="options.previous"
                    @click="changeToPreviousPage"
                    class="relative inline-flex items-center mr-2 px-2 py-2 transition-500 hover:shadow-sm rounded-full bg-white text-sm font-medium text-gray-500 shadow-md cursor-pointer">
                    <ChevronLeftIcon class="h-4 w-4" />
                  </a>
                  <a 
                    @click="changePageOffset(number)" 
                    v-for="(number, index) in displayPages" 
                    :key="index"
                    :class="number === activeItem ? 'current' : ''" 
                    class="table-number-button">
                    {{ number }}
                  </a>
                  <a
                    v-show="options.next"
                    @click="changeToNextPage"
                    class="relative inline-flex items-center ml-2 px-2 py-2 transition-500 hover:shadow-sm rounded-full bg-white text-sm font-medium text-gray-500 shadow-md cursor-pointer">
                    <ChevronRightIcon class="h-4 w-4" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import SortedAscIcon from '@/components/icons/SortedAscIcon.vue'
import SortedDescIcon from '@/components/icons/SortedDescIcon.vue'
import { Options } from '@/constants/types/Table'

@Component({ 
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    SortedAscIcon,
    SortedDescIcon
  }
})
export default class Table extends Vue {
  @Prop({ required: true }) readonly items!: object[]
  @Prop({ required: true }) readonly columns!: object[]
  @Prop({ required: true }) readonly options!: Options
  mounted () {
    this.currentPage = 1
    this.activeItem = 1
  }
  public githubIssueId: number | null = null
  public prevPage: number | null = null
  public nextPage: number | null = null
  public currentPage: number | null = null
  public pageNumbers: [] = []
  public pageNumberCount: number = 1
  public totalItems: number = this.options.total
  public maxItemsPerPage: number = this.options.count
  public lastPage: number = Math.ceil(this.totalItems / this.maxItemsPerPage)
  public notEnoughPages: true = true
  public currentSort: string = 'date'
  public currentSortDir: string = 'asc'
  public activeItem: number | null = null 

  onChange(): void {
    this.sortedItems
    this.itemsInPage
    this.displayPages
  }

  get displayPages() {
    // this.lastPage = Math.ceil(this.totalItems / this.maxItemsPerPage)
    const totalPages = this.lastPage;
    let currentPage: any = this.currentPage;
    if ([1, 2, 3, 4].includes(currentPage)) currentPage = 3;
    else if ([totalPages - 1, totalPages].includes(currentPage)) currentPage = Math.max(0, totalPages - Math.trunc(5 / 2));
    if (totalPages < 5){
      return [...Array(totalPages).keys()].map(i => Math.max(0, i - Math.trunc(5 / 2) + currentPage))
    } else {
      return [...Array(5).keys()].map(i => Math.max(0, i - Math.trunc(5 / 2) + currentPage))
    }
  }

  changePageOffset(pageNumber: number): void {
    let offset = (pageNumber - 1) * this.maxItemsPerPage
    console.log('called changePageOffset')
    this.$emit('changePageOffset', offset)
    this.currentPage = pageNumber
    this.activeItem = pageNumber
  }

  changeToPreviousPage(): void {
    this.$emit('previousPage')
    if (this.currentPage && this.activeItem)
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.activeItem -= 1
      } else {
        this.currentPage = 1
        this.activeItem = 1
      }
  }

  changeToNextPage(): void {
    this.$emit('nextPage')
    if (this.currentPage && this.activeItem)
      if (this.currentPage < this.lastPage) {
        this.currentPage += 1
        this.activeItem += 1
      } else {
        this.currentPage = this.lastPage
        this.activeItem = this.lastPage
      }
  }

  sort(s: string): void {
    console.log('this function has been temporarily disabled.')
    // if(s === this.currentSort) {
    //   this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    // }
    // this.currentSort = s;
  }

  get itemsInPage(): any[] {
    if (this.currentPage)
      var index: any = this.currentPage * this.maxItemsPerPage - this.maxItemsPerPage
      return this.items.slice(index, index + this.maxItemsPerPage)
  }

  get sortedItems(): any[] {
    return this.items
  }

  get textColumns(): any[] {
    return this.columns
  }

  get isPageGovernment(): boolean {
    console.log(this.$route.name)
    if (this.$route.name === 'government')
      return true

    return false
  }

}
</script>
<style scoped>
@media (max-width: 1024px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
    
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
</style>