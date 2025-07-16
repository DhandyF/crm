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
                            <td>{{ index + 1 }}</td>

                            <!-- Name -->
                            <td>{{ contact?.name ?? '' }}</td>

                            <!-- Phone -->
                            <td>{{ contact?.phone ?? '' }}</td>

                            <!-- Company -->
                            <td>{{ contact?.company ?? '' }}</td>

                            <!-- Role -->
                            <td>{{ getRoleLabel(contact?.role) }}</td>

                            <!-- Action -->
                            <td class="d-flex justify-content-center text-success">
                                <i class="material-icons cursor-pointer">call</i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
import { getContactList } from '@/api/crm';
import { duplicateVar, getAxiosErrorMessage } from '@/lib/helper';
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
            contacts: [],
            roleOptions: roles,
            debounce: null,
            company: '',
            selectedRole: 'All Role',
        };
    },
    async mounted() {
        this.initFilter();
        await this.getContact();
    },
    methods: {
        initFilter() {
            if (this.$route?.query?.company) {
                this.company = this.$route?.query?.company;
            }
            if (this.$route?.query?.role) {
                this.role = this.$route?.query?.role;
            }
        },
        async getContact() {
            try {
                const params = this.$route.query ?? {};
                const response = await getContactList(params);
                this.contacts = response?.data ?? [];
            } catch (error) {
                console.log('--error', getAxiosErrorMessage(error));
            }
        },
        filterContact() {
            const query = duplicateVar(this.$route.query);

            if (this.company !== '') {
                query.company = this.company ?? '';
            } else {
                delete query.company;
            }

			this.$router.push({ query });

            this.getContact();
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

            this.getContact();
        },
        getRoleLabel(role) {
            return roles.find(item => item.key === role)?.value ?? '';
        },
    },
}
</script>
