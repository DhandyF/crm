<template>
    <div id="contact">
        <!-- Header -->
        <header class="page-header mb-5">
            <h1>Contact</h1>
        </header>

        <!-- Filter -->
        <section
            id="filter"
            class="d-flex mb-3"
        >
            <!-- Company -->
            <input
                v-model="company"
                type="text"
                class="form-control form-input me-2"
                placeholder="Company Name"
                aria-label="Company Name"
                @input="onInputCompany"
            >

            <!-- Role -->
            <div class="dropdown">
                <button
                    class="btn btn-light dropdown-toggle form-input d-flex justify-content-between align-items-center border"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span>{{ selectedRole }}</span>
                </button>
                <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                    <button
                        v-for="role in roleOptions"
                        :key="role.key"
                        type="button"
                        class="dropdown-item"
                        @click="onSelectRole(role)"
                    >
						{{ role.value }}
					</button>
                </ul>
            </div>
        </section>

        <!-- Main Table -->
        <section id="contact-table">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
						<tr>
                            <th
                                v-for="(header, index) in tableHeader"
                                :key="index"
                            >
                                {{ header }}
                            </th>
						</tr>
					</thead>
                    <tbody>
                        <tr
                            v-for="(contact, index) in contacts"
                            :key="contact.name + index"
                            class=""
                        >
                            <!-- No -->
                            <td>
                                <span>{{ index + 1 }}</span>
                            </td>

                            <!-- Name -->
                            <td>
                                <div class="d-flex justify-content-between">
                                    <span>{{ contact?.name ?? '' }}</span>
                                    <i
                                        class="material-icons fs-6 cursor-pointer"
                                        :class="{'text-danger': contact.is_favorite === 1}"
                                        @click="setFavoriteContact(contact)"
                                    >
                                        {{ contact.is_favorite === 0 ? 'favorite_outline' : 'favorite'}}
                                    </i>
                                </div>
                            </td>

                            <!-- Phone -->
                            <td>
                                <span>{{ contact?.phone ?? '' }}</span>
                            </td>

                            <!-- Company -->
                            <td>
                                <span>{{ contact?.company ?? '' }}</span>
                            </td>

                            <!-- Role -->
                            <td>
                                <span>{{ getRoleLabel(contact?.role) }}</span>
                            </td>

                            <!-- Action -->
                            <td class="d-flex justify-content-center text-success">
                                <i
                                    class="material-icons cursor-pointer"
                                    data-bs-toggle="modal"
                                    data-bs-target="#call-modal"
                                    @click="callContact(contact)"
                                >
                                    call
                                </i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Table Empty -->
            <div
                v-if="contacts.length === 0 && isFetching === false"
                class="d-flex justify-content-center align-items-center w-100 mt-4"
            >
                <i class="material-icons md-48 me-2">error_outline</i>
                <span>Contact is empty.</span>
            </div>

            <!-- Table Loader -->
            <div v-if="isFetching" class="d-flex justify-content-center w-100 mt-4">
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </section>

        <!-- Modal -->
        <div
            id="call-modal"
            class="modal fade"
            tabindex="-1"
            aria-labelledby="call-modal"
            aria-hidden="true"
            data-bs-keyboard="false"
            data-bs-backdrop="static"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body d-flex flex-column justify-content-center align-items-center p-4">
                        <div class="d-flex justify-content-between w-100">
                            <div></div>
                            <h3 class="modal-title" id="exampleModalLabel">Calling...</h3>
                            <i
                                class="material-icons cursor-pointer"
                                data-bs-dismiss="modal"
                                @click="endCall('close')"
                            >close</i>
                        </div>
                        <i class="material-icons call-icon">call</i>
                        <p>{{ convertSecondToTime(callTimer) }}</p>
                        <h5>{{ selectedContact.name }}</h5>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button
                            type="button"
                            class="btn btn-danger d-flex align-items-center"
                            data-bs-dismiss="modal"
                            @click="endCall('end-call')"
                        >
                            <i class="material-icons py-1">call_end</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    convertSecondToTime,
    duplicateVar,
} from '@/lib/helper';
import { roles } from '@/lib/statics';

const tableHeader = [
    'No',
    'Name',
    'Phone',
    'Company',
    'Role',
    'Action',
];

export default {
    name: 'ContactView',
    data() {
        return {
            tableHeader,
            // contacts: [],
            roleOptions: roles,
            debounce: null,
            company: '',
            selectedRole: 'All Role',
            selectedContact: {},
            callTimer: 0,
            timerInterval: null,
            isFetching: false,
        };
    },
    computed: {
        contacts() {
            return this.$store.getters.contactList;
        },
    },
    async mounted() {
        this.initFilter();
        await this.fetchContact();
    },
    methods: {
        convertSecondToTime,
        initFilter() {
            if (this.$route?.query?.company) {
                this.company = this.$route?.query?.company;
            }
            if (this.$route?.query?.role) {
                this.role = this.$route?.query?.role;
            }
        },
        async fetchContact() {
            this.isFetching = true;
            const params = this.$route.query ?? {};
            await this.$store.dispatch('fetchContactList', params);
            this.isFetching = false;
        },
        async setFavoriteContact(contact) {
            const isFavorite = !!contact?.is_favorite;
            const newFavoriteValue = isFavorite ? 0 : 1;
            const params = {
                contactId: contact.id,
                is_favorite: newFavoriteValue,
            };

            await this.$store.dispatch('setFavoriteContact', params);
        },
        filterContact() {
            const query = duplicateVar(this.$route.query);

            if (this.company !== '') {
                query.company = this.company ?? '';
            } else {
                delete query.company;
            }

			this.$router.push({ query });

            this.fetchContact();
        },
        onInputCompany() {
            clearTimeout(this.debounce);

            this.debounce = setTimeout(() => {
                this.filterContact();
            }, 1000);
        },
        onSelectRole(role) {
            const query = duplicateVar(this.$route.query);

            if (role.key === 'all_role') {
                this.selectedRole = 'All Role';
                delete query.role;
            } else {
                this.selectedRole = role.value;
                query.role = role?.key ?? '';
            }

            this.$router.push({ query });

            this.fetchContact();
        },
        getRoleLabel(role) {
            return roles.find(item => item.key === role)?.value ?? '';
        },
        async saveCallLog(status) {
            const params = {
                name: this.selectedContact?.name ?? '',
                phone: this.selectedContact?.name ?? '',
                duration: this.callTimer,
                status,
            };

            await this.$store.dispatch('storeCallLog', params);

            this.callTimer = 0;
        },
        callContact(contact) {
            this.selectedContact = contact;
            this.startCallTimer();
        },
        endCall(type) {
            const status = type === 'end-call' ? 'Completed' : 'Missed';
            this.saveCallLog(status);

            this.stopCallTimer();
        },
        startCallTimer() {
            this.timerInterval = setInterval(() => {
                this.callTimer += 1;
            }, 1000);
        },
        stopCallTimer() {
            clearInterval(this.timerInterval);
        },
    },
}
</script>

<style lang="scss">
.call-icon {
    font-size: 50px;
    margin: 100px 50px;
}
</style>
