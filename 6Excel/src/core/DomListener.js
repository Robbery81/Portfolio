export class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error('Not $root provided for DomListener');
        }
        this.$root = $root;
    }
}
