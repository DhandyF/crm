<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div class="container-fluid container">
            <span class="navbar-brand fw-bold cursor-pointer" @click="$router.push('/')">CRM</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <span class="nav-link cursor-pointer" @click="$router.push('/contacts')">Contact</span>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link cursor-pointer" @click="$router.push('/call-logs')">Call Logs</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
