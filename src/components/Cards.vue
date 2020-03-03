<template>
    <div class="accordion" id="Cards">
        <div class="card">
            <div class="card-header">
                <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#card-1">
                        הערה 1
                    </button>
                </h2>
            </div>
            <div id="card-1" class="collapse">
                שמע חסר לי הרבה טקסט
                <div class="accordion">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#card-1-1">
                                    הערה מקוננת
                                </button>
                            </h2>
                        </div>
                        <div id="card-1-1" class="collapse">
                            <div class="card-body">
                                שמע חסר לי הרבה טקסט
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#card-2">
                        הערה 2
                    </button>
                </h2>
            </div>
            <div id="card-2" class="collapse">
                <div class="card-body">
                    שמע חסר לי הרבה טקסט
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cards',
    data() {
        return {

        };
    }
}
</script>

<style lang="scss">
    #Cards {
        .card {
            text-align: right;
        }
    }
</style>