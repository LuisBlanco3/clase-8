using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Obstacle"))
        {
            Debug.Log("¡Perdiste!");
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }
    }
}
